import React from 'react';

import { KubaFone } from '@assets/images';
import { useNavigation } from '@react-navigation/native';
import { Box, Container, ContainerImage, Image } from './styles';
import { Spacer } from '@components/Spacer';
import Text from '@components/Text';

interface CardDeviceProps {
	title: string;
	id: number;
}

export function CardDevice({ title, id }: CardDeviceProps) {
	const { navigate } = useNavigation<any>();

	return (
		<Container
			style={{
				elevation: 8
			}}
			onPress={() => navigate('Device', { deviceID: id })}>
			<ContainerImage>
				<Image source={KubaFone} />
			</ContainerImage>

			<Spacer h={4} />

			<Text style={{ textAlign: 'center' }} fontSize={14}>
				{title}
			</Text>
			<Spacer h={16} />
		</Container>
	);
}
