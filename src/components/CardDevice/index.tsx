import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Container, ContainerImage } from './styles';
import { Spacer } from '@components/Spacer';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';

interface CardDeviceProps {
	id: number;
	imgURL: string;
	title: string;
	isBluetooth: boolean;
}

export function CardDevice({
	id,
	imgURL,
	title,
	isBluetooth
}: CardDeviceProps) {
	const { navigate } = useNavigation<any>();

	return (
		<Container
			style={{
				elevation: 4,
				marginVertical: scale(4),
				marginRight: scale(8)
			}}
			onPress={() =>
				navigate('Device', { id, name: title, imgURL, isBluetooth })
			}>
			<ContainerImage>
				<Image
					style={{
						width: '80%',
						height: '80%'
					}}
					resizeMode="contain"
					source={{
						uri: imgURL
					}}
				/>
			</ContainerImage>

			<Spacer h={4} />

			<Text color="#6E6E6E" style={{ textAlign: 'center' }} fontSize={14}>
				{title}
			</Text>
			<Spacer h={16} />
		</Container>
	);
}
