import React from 'react';

import { Container, ImageBackground, ContainerText } from './styles';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';

interface CardProfileProps {
	id: number;
	name: string;
	imgURL: string;
}

export function CardProfile({ id,name, imgURL }: CardProfileProps) {
	const navigation = useNavigation<any>();

	return (
		<Container
			onPress={() =>
				navigation.navigate('Preset', {
					preset: {
						id,
						name,
						imgURL
					}
				})
			}>
			<ImageBackground
				source={
					imgURL ? {
					uri: imgURL
				}: require('@assets/images/avatar.png')}
			/>
			<ContainerText>
				<Text
					variant="bold"
					color="#FFF"
					fontSize={12}
					style={{
						textTransform: 'uppercase'
					}}>
					{name}
				</Text>
			</ContainerText>
		</Container>
	);
}
