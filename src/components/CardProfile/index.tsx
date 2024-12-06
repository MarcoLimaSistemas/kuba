import React from 'react';

import { Container, ImageBackground, ContainerText } from './styles';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { IPreset } from '@models/preset';

interface CardProfileProps {
	id: number;
	name: string;
	imgURL: string;

}


export function CardProfile({data}:{data: IPreset}) {

	const navigation = useNavigation<any>();

	return (
		<Container
			onPress={() =>
				navigation.navigate('Preset', {
					preset: {
						data
					}
				})
			}>
			<ImageBackground
				source={{uri:"https://kuba-staging-api-files.s3.sa-east-1.amazonaws.com/preset/808-1"}}
			/>
			<ContainerText>
				<Text
					variant="bold"
					color="#FFF"
					fontSize={12}
					style={{
						textTransform: 'uppercase'
					}}>
					{data.name}
				</Text>
			</ContainerText>
		</Container>
	);
}
