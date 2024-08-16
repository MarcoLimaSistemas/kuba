import React from 'react';
import { Container, ImageCover } from './styles';
import { ContainerText } from '../styles';
import Text from '@components/Text';

interface ICardPersonality {
	imgURL: string;
	name: string;
}

export function CardPersonality({ imgURL, name }: ICardPersonality) {
	return (
		<Container>
			<ImageCover
				source={{
					uri: imgURL
				}}
				resizeMode="cover"
			/>

			<ContainerText>
				<Text
					variant="bold"
					color="#FFF"
					style={{ textTransform: 'uppercase' }}>
					{name}
				</Text>
			</ContainerText>
		</Container>
	);
}
