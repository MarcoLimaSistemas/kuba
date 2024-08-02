import singerPng from '@assets/images/SingerProfile.png';
import React from 'react';
import { Container, ImageCover } from './styles';
import { ContainerText } from '../styles';
import Text from '@components/Text';

export function CardPersonality() {
	return (
		<Container>
			<ImageCover source={singerPng} />

			<ContainerText>
				<Text
					variant="bold"
					color="#FFF"
					style={{ textTransform: 'uppercase' }}>
					Crioulo
				</Text>
			</ContainerText>
		</Container>
	);
}
