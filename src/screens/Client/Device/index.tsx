import React, { useState } from 'react';

import { KubaFone } from '@assets/images';
import { Button } from '@components/Button';
import { CarouselProfile } from '@components/CarouselProfile';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Headset, Info, Lighting } from '@assets/icons';

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
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBluetooth } from '../../../context/BluetoothContext';
import { Header } from '@components/Header';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';

const dataExample = [
	{
		id: 1,
		name: 'Cliolo'
	},
	{
		id: 2,
		name: 'Cliolo'
	},
	{
		id: 3,
		name: 'Cliolo'
	}
];

export function Device() {
	const route = useRoute();

	const device = route.params as any;

	const [scrollEnabled, setScrollEnabled] = useState(true);
	const { top } = useSafeAreaInsets();

	const navigation = useNavigation<any>();

	const { connectedDevice, connectToDevice } = useBluetooth();

	const handleScrollEnabled = (enabled: boolean) => {
		setScrollEnabled(enabled);
	};

	return (
		<>
			<Header />
			<Container
				style={{
					paddingTop: top
				}}
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
								handleScrollEnabled={handleScrollEnabled}
							/>

							<CarouselProfile
								titleProfile={'Perfis Personalidades'}
								data={dataExample}
							/>

							<Spacer h={16} />

							<CarouselProfile
								titleProfile={'Perfis Públicos '}
								data={dataExample}
								isPersonalities={false}
							/>
						</ContainerCarousel>
					</>
				)}

				<Spacer h={32} />

				<View style={{ flex: 1 }} />

				<BoxButtons
					style={{
						paddingHorizontal: 16
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
				</BoxButtons>

				<Footer>
					<Button
						title="Voltar"
						onPress={() => navigation.goBack()}
					/>
				</Footer>
			</Container>
		</>
	);
}
