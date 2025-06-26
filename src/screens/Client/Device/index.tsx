import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';


import { CarouselProfile } from '@components/CarouselProfile';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';


import { Headset, Info, Lighting, Settings } from '@assets/icons';

import {
	BoxButtons,
	Button,
	Container,
	ContainerCarousel,
	ContainerConnections,
	ContainerEqualizer,
	ContainerImg,
	ContainerPresets,
	Footer,
	Wrapper
} from './styles';

import { DeviceEventEmitter, Image, TouchableOpacity, View } from 'react-native';
import { ButtonSquare } from '@components/ButtonSquare';

import { Spacer } from '@components/Spacer';
import { Equalizer } from '@components/Equalizer';
import { useBluetooth } from '../../../context/BluetoothContext';
import { Header } from '@components/Header';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';
import { ModalPreset } from '@components/ModalPreset';
import { Modalize } from 'react-native-modalize';
import { useQuery } from '@tanstack/react-query';
import { getPresets, getPresetsPublics } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { ElementConnectedDevice } from '@components/ElementConnectedDevice';
import ConnectionScreen from '@components/Equalizer/connectionScreen';

import DeviceListScreen from '@components/Equalizer/deviceList';
import { StateChangeEvent } from 'react-native-bluetooth-classic/lib/BluetoothEvent';
import { HeaderEqualizer, IMyPresets } from '@components/Equalizer/Header';
import { IPreset, IPresets } from '@models/preset';
import { getDataPresets } from '@services/internal-storage';
import { KubaFoneDiscoImg } from '@assets/images';
import { CardProfile } from '@components/CardProfile';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import { ModalSelectValue } from '@components/ModalSelectValue';
import { IBand, IBandSettings, IPresetUser } from '@models/band';
import { initialBands } from '../HomeScreen/initialDate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET_ID } from '@config/storage';
import { sendEQParametersSequentially } from '@utils/sendEQParametersSequentially';






export interface IFrequency {
	frequency: string;
	decibel_quantity: number;
	quality: number
}

interface AppState {
	device?: BluetoothDevice;
	bluetoothEnabled: boolean;
}

const presetDefault =  [
	{ id: 1, label: "32", frequency: 32, gain: 0 , quality: 0.25},
  { id: 2, label: "62", frequency: 62, gain: 0 ,quality: 0.25},
  { id: 3, label: "125", frequency: 125, gain: 0 ,quality: 0.25},
  { id: 4, label: "250", frequency: 250, gain: 0 ,quality: 0.25},
  { id: 5, label: "500", frequency: 500, gain: 0 ,quality: 0.25},
  { id: 6, label: "1K", frequency: 1000, gain: 0 ,quality: 0.25},
  { id: 7, label: "2K", frequency: 2000, gain: 0 ,quality: 0.25},
  { id: 8, label: "4K", frequency: 4000, gain: 0 ,quality: 0.25},
  { id: 9, label: "8K", frequency: 800, gain: 0 ,quality: 0.25},
  { id: 10, label: "16K", frequency: 16000, gain: 0,quality: 0.25 }
]

export function Device() {

	const device = {
		id: 1,
		imgURL: "https://kuba-staging-api-files.s3.sa-east-1.amazonaws.com/product/941-1",
		isBluetooth: true,
		name: "Disco Bluetooth"
	}



	const {
		setFrequency, setGain, setQuality,
		isModalSelectValueVisible,
		setIsModalSelectValueVisible,
		selectedBand,
		settings,
		setSettings,
		setBands,
		modalValue
	} = useValuesEqualizer();

	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [currentPreset, setCurrentPreset] = useState<IPresetUser | null>(null);


	const [isEdit, setIsEdit] = useState(false);

	const navigation = useNavigation<any>();

	const { connectedDevice, connectToDevice, state, setState } = useBluetooth();

	const [presetID, setPresetId] = useState<string | null>("")

	const { data: profilesData } = useQuery({
		queryKey: ['MyPresets'],
		queryFn: async () => await getDataPresets(),
		//enabled: isFetched
	});


	const profiles = useMemo(() => {
		return profilesData ?? []
	}, [profilesData]);

	const groupedProfiles = []

	for (let i = 0; i < profiles.length; i += 4) {
		groupedProfiles.push(profiles.slice(i, i + 4));
	}


	const handleScrollEnabled = (enabled: boolean) => {
		setScrollEnabled(enabled);
	};

	const handlePreset = (preset: IMyPresets) => {
		// const form = {
		// 	name: preset.label,
		// 	...preset
		// } as unknown as IPresetUser

		// setCurrentPreset(form);
	};






	const handleModalEdit = (isEdit: boolean) => {
		setIsEdit(isEdit);
	};

	const modalizeRef = useRef<Modalize>(null);

	const openModal = () => modalizeRef.current?.open();
	const closeModal = () => modalizeRef.current?.close();

	const resetValues = () => {

		setSettings(presetDefault)
		sendEQParametersSequentially(presetDefault)
	}
	// const [state, setState] = useState<AppState>({
	//   device: undefined,
	//   bluetoothEnabled: true,
	// });

	let enabledSubscription: any;
	let disabledSubscription: any;

	const selectDevice = (device: BluetoothDevice) => {
		console.log('App::selectDevice() called with: ', device);
		setState((prevState) => ({ ...prevState, device }));
	};

	const checkBluetoothEnabled = async () => {
		try {
			console.log('App::componentDidMount Checking bluetooth status');
			const enabled = await RNBluetoothClassic.isBluetoothEnabled();

			console.log(`App::componentDidMount Status: ${enabled}`);
			setState((prevState) => ({ ...prevState, bluetoothEnabled: enabled }));
		} catch (error) {
			console.log('App::componentDidMount Status Error: ', error);
			setState((prevState) => ({ ...prevState, bluetoothEnabled: false }));
		}
	};

	const onStateChanged = (stateChangedEvent: StateChangeEvent) => {
		console.log('App::onStateChanged event used for onBluetoothEnabled and onBluetoothDisabled');

		setState((prevState) => ({
			...prevState,
			bluetoothEnabled: stateChangedEvent.enabled,
			device: stateChangedEvent.enabled ? prevState.device : undefined,
		}));
	};



	const handlePresetBox = (preset: IPresetUser) => {
		setCurrentPreset(preset);

	};

	const handleSave = (newValue: number) => {

		if (selectedBand) {
			if (selectedBand.type === 'quality') {

				const updatedSettings = settings.map(item =>
					item.id === selectedBand.id + 1 ? { ...item, quality: Number(newValue.toFixed(2)) } : item
				) as IBandSettings[];

				setSettings(updatedSettings);

				const bandId = selectedBand.id + 1;
				const type = selectedBand.type;
				const value = newValue


				DeviceEventEmitter.emit("onEventEqualizer", { bandId, type, value });
				return
			}
			if (selectedBand.type === 'gain') {

				const updatedSettings = settings.map(item =>
					item.id === selectedBand.id + 1 ? { ...item, gain: Number(newValue.toFixed(1)) } : item
				) as IBandSettings[];

				setSettings(updatedSettings);
				const bandId = selectedBand.id + 1;
				const type = selectedBand.type;
				const value = newValue


				DeviceEventEmitter.emit("onEventEqualizer", { bandId, type, value });
				return
			}

		}
		setIsModalSelectValueVisible(false);
	};

	useFocusEffect(
		useCallback(() => {
			(async () => {

				const preset = await AsyncStorage.getItem(STORAGE_PRESET_ID);

				if (preset !== null) {
					const presetData = JSON.parse(preset) as IPresetUser;

					setCurrentPreset(presetData);
					const newEqualizerConfig = presetData?.equalizerConfigs.map((item) => ({
						...item,
						frequency: Number(item.frequency),
						quality: Number(item.quality),
						gain: Number(item.gain),
					}) as unknown as IBandSettings) ?? []
					setSettings(newEqualizerConfig)


				}
				return
			})();
		}, [])
	)

	useEffect(() => {
		console.log('App::componentDidMount adding listeners: onBluetoothEnabled and onBluetoothDistabled');
		console.log('App::componentDidMount alternatively could use onStateChanged');
		enabledSubscription = RNBluetoothClassic.onBluetoothEnabled(onStateChanged);
		disabledSubscription = RNBluetoothClassic.onBluetoothDisabled(onStateChanged);

		checkBluetoothEnabled();

		return () => {
			console.log('App:componentWillUnmount removing subscriptions: enabled and disabled');
			console.log('App:componentWillUnmount alternatively could have used stateChanged');
			enabledSubscription.remove();
			disabledSubscription.remove();
		};
	}, []);
	return (
		<Wrapper
			from={{
				translateY: -128,
				opacity: 0.5,
			}}
			animate={{
				translateY: 0,
				opacity: 1,
			}}
		>
			<Header />


			<Spacer h={8} />

			<Container
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				scrollEnabled={scrollEnabled}>
				<ContainerImg
					from={{
						translateY: 300,
						opacity: 0.5,
					}}
					animate={{
						translateY: 0,
						opacity: 1,
					}}
					transition={{ type: 'spring' }}
				>
					<Image
						style={{
							width: '80%',
							height: '80%'
						}}
						resizeMode="contain"
						source={KubaFoneDiscoImg}
					/>
				</ContainerImg>

				<Spacer h={16} />

				<Text
					variant="bold"
					style={{
						color: '#656565',
						textAlign: 'center',
						textTransform: 'uppercase',
						letterSpacing: scale(6)
					}}>
					{device?.name}
				</Text>

				<Spacer h={16} />

				{device?.isBluetooth && (
					<>
						{!state.device ? (
							<DeviceListScreen
								selectDevice={selectDevice}
							/>
						) : (
							<>
								{state.device !== null && (
									<ElementConnectedDevice
										connectToDevice={selectDevice}
										connectedDevice={state.device ? state.device : null}
									/>
								)}
								<ContainerEqualizer>

									<HeaderEqualizer
										onOpen={openModal}
										handlePreset={handlePreset}
										handleScrollEnabled={handleScrollEnabled}
										handleModalEdit={handleModalEdit}
										connectToDevice={selectDevice}

									/>
									<ConnectionScreen
										device={state.device}
										handleScrollEnabled={handleScrollEnabled}
										onBack={() => setState((prevState) => ({ ...prevState, device: undefined }))}
									/>
								</ContainerEqualizer>

								{/* <ContainerCarousel>
									<BoxButtons>
										<Button isReset onPress={resetValues}>
											<Text variant='bold' fontSize={14} color='#777777' >RESETAR</Text>
										</Button>

										<Button isReset={false} onPress={openModal}>
											<Text variant='bold' fontSize={14} color='#777777' >SALVAR</Text>
										</Button>
									</BoxButtons>


									<Spacer h={16} />
									<Text variant='bold' fontSize={14} color='#777777' >SEUS PERFIS</Text>
									<Spacer h={10} />

									{groupedProfiles.length > 0 && (
										<>
											{groupedProfiles.map((preset,index) => (
												<ContainerPresets key={index}>
													{preset.map(item => (
														<CardProfile
															key={item.id}
															handlePreset={() => handlePresetBox(item)}
															isSelected={currentPreset?.id === item.id}
															data={item as IPresetUser}
														/>
													))}

												</ContainerPresets>


											))}
										</>
									)}

								</ContainerCarousel> */}
								<Spacer h={32} />

								<View style={{ flex: 1 }} />


							</>
						)}

					</>
				)}

			</Container>

			<ModalPreset
				ref={modalizeRef}
				currentPreset={currentPreset}
				isEdit={true}
				onClose={() => closeModal()}
			/>
			<ModalSelectValue
				isVisible={isModalSelectValueVisible}
				onSave={handleSave}
				onCancel={() => setIsModalSelectValueVisible(false)}
			/>
		</Wrapper>
	);
}
