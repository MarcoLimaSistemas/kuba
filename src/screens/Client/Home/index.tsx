import React from 'react';

import { Button } from '@components/Button';
import { Carousel } from '@components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, Pressable, Image, Alert, View } from 'react-native';

import {
	background,
	backgroundSecondary,
	FigureCompleted
} from '@assets/images';

import { Close } from '@assets/icons';

import {
	Container,
	ContainerHeader,
	ContainerModal,
	ContainerSchoolKuba,
	IconClose,
	ImageHeaderHome,
	ImageModalContainer,
	ImageSchoolKuba
} from './styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DeviceProps } from '@models/device';
import { Header } from '@components/Header';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';

export function Home() {
	const [devices, setDevices] = useState<DeviceProps[]>([
		{
			id: 1,
			is_bluetooth: true,
			nome: 'Kuba 01',
			user_admin_id: 2
		}
	]);

	const navigation = useNavigation();

	return (
		<>
			<ContainerHeader>
				<Header typeLogo="white" />
				<ImageHeaderHome source={background} />

				<View
					style={{
						paddingHorizontal: scale(16),
						marginTop: 'auto'
					}}>
					<Text color="#FFF" variant="light">
						Escola Kuba
					</Text>
					<Spacer h={4} />
					<Text variant="bold" color="#FFF">
						Como tirar o melhor som de um fone?
					</Text>
				</View>
				<Spacer h={16} />
			</ContainerHeader>

			<Spacer h={32} />

			<Carousel data={devices} />

			<Container>
				<ContainerSchoolKuba
					onPress={() => navigation.navigate('School')}>
					<ImageSchoolKuba source={backgroundSecondary} />

					<View
						style={{
							position: 'absolute',
							justifyContent: 'center',
							alignItems: 'center',
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							flex: 1,
							paddingHorizontal: scale(16)
						}}>
						<View>
							<Text
								color="#FFF"
								variant="bold"
								style={{
									textAlign: 'center',
									letterSpacing: scale(6)
								}}>
								ESCOLA KUBA
							</Text>
							<Spacer h={8} />
							<Text
								fontSize={12}
								color="#FFF"
								style={{ textAlign: 'center' }}>
								Aprenda mais sobre o mundo do áudio
							</Text>
						</View>
					</View>
				</ContainerSchoolKuba>

				<Spacer h={16} />
			</Container>

			{/* <Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					setModalVisible(!modalVisible);
				}}>
				<ContainerModal>
					<KeyboardAwareScrollView
						showsVerticalScrollIndicator={false}>
						<Pressable onPress={() => setModalVisible(false)}>
							<IconClose>
								<Image source={Close} />
							</IconClose>
						</Pressable>

						<ImageModalContainer>
							<Image source={FigureCompleted} />
						</ImageModalContainer>

						<Text>Complete seu Perfil!</Text>
						<Text>
							Complete seu perfil para ter uma experiência Kuba
							completa!
						</Text>
						<Button
							title="Completar Perfil"
							onPress={() => navigation.navigate('Profile')}
						/>
						<Button
							title="Mais Tarde"
							variant="secondary"
							onPress={() => setModalVisible(false)}
						/>
					</KeyboardAwareScrollView>
				</ContainerModal>
			</Modal> */}
		</>
	);
}
