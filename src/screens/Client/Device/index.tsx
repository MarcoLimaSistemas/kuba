import React, { useEffect, useMemo, useRef, useState } from 'react';


import { CarouselProfile } from '@components/CarouselProfile';
import { useNavigation } from '@react-navigation/native';
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

import { Image, TouchableOpacity, View } from 'react-native';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET_ID } from '@config/storage';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';





export interface IFrequency {
	frequency: string;
	decibelQuantity: number;
	quality: number
}

interface AppState {
	device?: BluetoothDevice;
	bluetoothEnabled: boolean;
}

export function Device() {

	const device = {
		id: 1,
		imgURL: "https://kuba-staging-api-files.s3.sa-east-1.amazonaws.com/product/941-1",
		isBluetooth: true,
		name: "Disco Bluetooth"
	}



  const {
   
    setCurrentPresetId,
  } = useValuesEqualizer();
	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [currentPreset, setCurrentPreset] = useState<IPreset | null>(null);


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
		return profilesData ?? [];
		// return [
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 1,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 2,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 3,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 4,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 5,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 6,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 7,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 8,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 9,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// 	{
		// 		"description": "23213",
		// 		"equalizerConfigs": [
		// 			{
		// 				"band": 1,
		// 				"frequency": 20000,
		// 				"quality": 7.999999999999997
		// 			}
		// 		],
		// 		"genreId": 1,
		// 		"id": 10,
		// 		"isPublic": false,
		// 		"name": "rock"
		// 	},
		// ]

	}, [profilesData]);
	const groupedProfiles = []

	for (let i = 0; i < profiles.length; i += 4) {
		groupedProfiles.push(profiles.slice(i, i + 4));
	}


	const handleScrollEnabled = (enabled: boolean) => {
		setScrollEnabled(enabled);
	};

	const handlePreset = (preset: IMyPresets) => {
		const form = {
			name: preset.label,
			...preset
		} as unknown as IPreset
		setCurrentPreset(form);
	};

	const handlePresetBox = (preset: IPresets) => {
		const form = {
			label: preset.name,
			value: preset.id,
			...preset
		} as unknown as IPreset
		setCurrentPreset(form);
		setCurrentPresetId(form.id)
		
	};



	const handleModalEdit = (isEdit: boolean) => {
		setIsEdit(isEdit);
	};

	const modalizeRef = useRef<Modalize>(null);

	const openModal = () => modalizeRef.current?.open();
	const closeModal = () => modalizeRef.current?.close();

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

	
	//console.log("presetID1",presetID)
	//console.log("profiles1", profiles[0].equalizerConfigs)
	console.log('cuurent', currentPreset)
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

				{!device?.isBluetooth && (
					<>
						{state.device ? (
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
									/>
									<ConnectionScreen
										device={state.device}
										handleScrollEnabled={handleScrollEnabled}
										onBack={() => setState((prevState) => ({ ...prevState, device: undefined }))}
									/>
								</ContainerEqualizer>

								<ContainerCarousel>
									<BoxButtons>
										<Button isReset>
											<Text variant='bold' fontSize={14} color='#777777' >RESETAR</Text>
										</Button>

										<Button isReset={false} onPress={openModal}>
											<Text variant='bold' fontSize={14} color='#777777' >SALVAR</Text>
										</Button>
									</BoxButtons>


									<Spacer h={16} />
									{groupedProfiles.length > 0 && (
										<>
											{groupedProfiles.map((preset) => (
												<ContainerPresets>
													{preset.map(item => (


														<CardProfile
															key={item.id}
															handlePreset={() => handlePresetBox(item)}
															isSelected={currentPreset?.id === item.id}
															data={item as IPresets}
														/>

													))}
												</ContainerPresets>
											))}
										</>

									)}

								</ContainerCarousel>
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
				isEdit={isEdit}
				onClose={() => closeModal()}
			/>
		</Wrapper>
	);
}
