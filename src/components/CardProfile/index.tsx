import { singer } from '@assets/images';
import React from 'react';

import { Container, ImageBackground, ContainerText } from './styles';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';

interface CardProfileProps {
	name: string;
}

export function CardProfile({ name }: CardProfileProps) {
	const navigation = useNavigation();

	return (
		<Container onPress={() => navigation.navigate('Preset')}>
			<ImageBackground source={singer} />
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
