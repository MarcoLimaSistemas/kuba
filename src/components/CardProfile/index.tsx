import React from 'react';

import { Container, ImageBackground, ContainerText, Background } from './styles';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { IPreset, IPresets } from '@models/preset';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_PRESET_ID } from '@config/storage';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import { IMyPresets } from '@components/Equalizer/Header';
import { IBand, IBandSettings, IPresetUser } from '@models/band';
import { sendEQParametersSequentially } from '@utils/sendEQParametersSequentially';





export function CardProfile(
	{ data, isSelected, handlePreset }:
		{ data: IPresetUser, isSelected: boolean, handlePreset: () => void; }) {

	const {
		setSettings,
	} = useValuesEqualizer();



	const handleSetPreset = async () => {

		await AsyncStorage.setItem(STORAGE_PRESET_ID, JSON.stringify(data));
		handlePreset();

		const newArray = data?.equalizerConfigs.map((item) => ({

			id: Number(item.id),
			frequency: Number(item.frequency),
			quality: Number(item.quality),
			gain: Number(item.gain),
		}) as unknown as IBandSettings) ?? [];

	await	setSettings(newArray);
	sendEQParametersSequentially(newArray);

	};

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
						textTransform: 'uppercase',
						textAlign: 'center',
						padding: 2,
					}}>
					{data.name}
				</Text>
			</ContainerText>
		</Container>
	);
}
