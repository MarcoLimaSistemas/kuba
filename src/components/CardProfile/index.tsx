import React from 'react';

import { Container, ImageBackground, ContainerText, Background } from './styles';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { IPreset, IPresets } from '@models/preset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET_ID } from '@config/storage';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import { IMyPresets } from '@components/Equalizer/Header';
import { IPresetUser } from '@models/band';





export function CardProfile(
	{ data, isSelected, handlePreset }:
	 { data:  IPresetUser, isSelected: boolean, handlePreset: () => void; }) {

	const {
		setSelectedOptionBand,
		setFrequency,
		setGain,
		setQuality,
		setBands
	} = useValuesEqualizer();

	const handleSetPreset = async () => {
		await AsyncStorage.setItem(STORAGE_PRESET_ID, JSON.stringify(data));
		handlePreset()



		// setFrequency(String(data.equalizerConfigs[0].frequency))
		// setGain(String(data.equalizerConfigs[0].decibel_quantity))
		// setQuality(String(data.equalizerConfigs[0].quality))
		// setSelectedOptionBand(String(data.equalizerConfigs[0].band) ?? null)
	}

	return (
		<Container
			onPress={handleSetPreset
			}>
			{/* <ImageBackground
				source={{uri:"https://kuba-staging-api-files.s3.sa-east-1.amazonaws.com/preset/808-1"}}
			/> */}
			<Background isSelected={isSelected} />
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
