import React, { useMemo, useRef, useState } from 'react';

import { Button } from '@components/Button';
import { CarouselProfile } from '@components/CarouselProfile';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Headset, Info, Lighting, Settings } from '@assets/icons';

import {
	BoxButtons,
	Container,
	ContainerCarousel,
	ContainerConnections,
	ContainerImg,
	Footer
} from './styles';

import { Image, TouchableOpacity, View } from 'react-native';
import { ButtonSquare } from '@components/ButtonSquare';

import { Spacer } from '@components/Spacer';
import { Equalizer } from '@components/Equalizer';
import { useBluetooth } from '../../../context/BluetoothContext';
import { Header } from '@components/Header';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';
import { IPreset, ModalPreset } from '@components/ModalPreset';
import { Modalize } from 'react-native-modalize';
import { useQuery } from '@tanstack/react-query';
import { getPresets, getPresetsPublics } from '@services/preset';
import { useAuth } from '@hooks/auth';

export interface IFrequency {
	frequency: string;
	decibelQuantity: number;
}

export function Device() {
	const route = useRoute();

	const device = route.params as any;

	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [currentPreset, setCurrentPreset] = useState<IPreset | null>(null);
	const [currentFrequencies, setCurrentFrequencies] = useState<IFrequency[]>(
		[]
	);

	const [isEdit, setIsEdit] = useState(false);

	const navigation = useNavigation<any>();

	const { connectedDevice, connectToDevice } = useBluetooth();

	const { user } = useAuth();

	const { data: personalitiesData, isFetched } = useQuery({
		queryKey: ['PersonalitiesOnDeviceScreen'],
		queryFn: () => getPresets(user?.id, undefined, 1, false, 5)
	});

	const personalities = useMemo(() => {
		return personalitiesData?.data ?? [];
	}, [personalitiesData]);

	const { data: profilesData } = useQuery({
		queryKey: ['PresetsPublicsOnDeviceScreen'],
		queryFn: () => getPresetsPublics(user?.id, undefined, 1, 5),
		enabled: isFetched
	});

	const profiles = useMemo(() => {
		return profilesData?.data ?? [];
	}, [profilesData]);

	const handleScrollEnabled = (enabled: boolean) => {
		setScrollEnabled(enabled);
	};

	const handlePreset = (preset: IPreset) => {
		setCurrentPreset(preset);
	};

	const handleFrequencies = (frequencies: IFrequency[]) => {
		setCurrentFrequencies(frequencies);
	};

	const handleModalEdit = (isEdit: boolean) => {
		setIsEdit(isEdit);
	};

	const modalizeRef = useRef<Modalize>(null);

	const openModal = () => modalizeRef.current?.open();
	const closeModal = () => modalizeRef.current?.close();

	return (
		<>
			<Header />

			<Spacer h={8} />

			<Container
				contentContainerStyle={{ flexGrow: 1 }}
				showsVerticalScrollIndicator={false}
				scrollEnabled={scrollEnabled}>
				<ContainerImg>
					<Image
						style={{
							width: '80%',
							height: '80%'
						}}
						resizeMode="contain"
						source={{
							uri: device?.imgURL
						}}
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
						<ContainerConnections>
							{connectedDevice !== null ? (
								<>
									<Text
										fontSize={12}
										variant="bold"
										color="#777777">
										CONECTADO
									</Text>

									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center'
										}}>
										<Image source={Lighting} />
										<Spacer w={8} />
										<Text>{'100%'}</Text>

										<Spacer w={16} />
										<TouchableOpacity
											onPress={() => {
												// connectToDevice()
											}}>
											<Text
												color="#2E9CCB"
												variant="bold">
												Desconectar
											</Text>
										</TouchableOpacity>
									</View>
								</>
							) : (
								<>
									<Text
										fontSize={12}
										variant="bold"
										color="#777777">
										DESCONECTADO
									</Text>

									<TouchableOpacity onPress={() => {}}>
										<Text color="#2E9CCB" variant="bold">
											Conectar
										</Text>
									</TouchableOpacity>
								</>
							)}
						</ContainerConnections>

						<ContainerCarousel>
							<Equalizer
								onOpen={openModal}
								handleFrequencies={handleFrequencies}
								handlePreset={handlePreset}
								handleModalEdit={handleModalEdit}
								handleScrollEnabled={handleScrollEnabled}
							/>

							<CarouselProfile
								titleProfile={'Perfis Personalidades'}
								data={personalities}
							/>

							<Spacer h={16} />

							<CarouselProfile
								titleProfile={'Perfis Públicos '}
								data={profiles}
								isPersonalities={false}
							/>
						</ContainerCarousel>
					</>
				)}

				<Spacer h={32} />

				<View style={{ flex: 1 }} />

				<BoxButtons
					style={{
						paddingHorizontal: scale(16)
					}}>
					<ButtonSquare
						label="Suporte"
						onPress={() =>
							navigation.navigate('Support', {
								deviceId: device?.id
							})
						}>
						<Image
							source={Headset}
							style={{
								width: 32,
								height: 32
							}}
							resizeMode="contain"
						/>
					</ButtonSquare>

					<Spacer w={16} />

					<ButtonSquare
						label="Tutorias de uso"
						onPress={() =>
							navigation.navigate('Tutorials', {
								deviceId: device?.id
							})
						}>
						<Image
							source={Info}
							style={{
								width: 32,
								height: 32
							}}
							resizeMode="contain"
						/>
					</ButtonSquare>

					{device.isBluetooth && (
						<>
							<Spacer w={16} />
							<ButtonSquare
								label="Configurações"
								onPress={() =>
									navigation.navigate('SettingsEarphone')
								}>
								<Image
									source={Settings}
									style={{
										width: 32,
										height: 32
									}}
									resizeMode="contain"
								/>
							</ButtonSquare>
						</>
					)}
				</BoxButtons>

				<Footer>
					<Button
						title="Voltar"
						onPress={() => navigation.goBack()}
					/>
				</Footer>
			</Container>

			<ModalPreset
				ref={modalizeRef}
				currentPreset={currentPreset}
				currentFrequencies={currentFrequencies}
				isEdit={isEdit}
				onClose={() => closeModal()}
			/>
		</>
	);
}
