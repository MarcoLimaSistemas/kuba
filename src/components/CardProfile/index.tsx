import React from 'react';

import { Container, ImageBackground, ContainerText, Background } from './styles';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { IPreset, IPresets } from '@models/preset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET_ID } from '@config/storage';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';




export function CardProfile({ data,isSelected }: { data: IPresets,isSelected:boolean }) {

	const {
		setSelectedOptionBand,
		setFrequency,
		setGain,
		setQuality
	} = useValuesEqualizer();

	const handleSetPreset = async () => {
		await AsyncStorage.setItem(STORAGE_PRESET_ID, JSON.stringify(data));

		setFrequency(String(data.equalizerConfigs[0].frequency))
		setGain(data.equalizerConfigs[0].decibel_quantity)
		setQuality(data.equalizerConfigs[0].quality)
		setSelectedOptionBand(String(data.equalizerConfigs[0].band) ?? null)
	}

	return (
		<Container
			onPress={handleSetPreset
			}>
			{/* <ImageBackground
				source={{uri:"https://kuba-staging-api-files.s3.sa-east-1.amazonaws.com/preset/808-1"}}
			/> */}
			<Background  isSelected={isSelected}/>
			<ContainerText>
				<Text
					variant="bold"
					color="#777777"
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
