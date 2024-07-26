import React, { useEffect, useState } from 'react';
import Text from '@components/Text';

import { frequencies as frequenciesList } from './data';
import { Spacer } from '@components/Spacer';
import { TouchableOpacity, View } from 'react-native';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import VerticalSlider from '@components/Slider';

import { NativeModules } from 'react-native';
import Slider from '@react-native-community/slider';

import { ModalPreset } from '@components/ModalPreset';
import * as S from './styles';

const { AudioEqualizerModule } = NativeModules;

interface EqualizerProps {
	handleScrollEnabled: (enabled: boolean) => void;
}

export const Equalizer = ({ handleScrollEnabled }: EqualizerProps) => {
	const [frequencies, setFrequencies] = useState(frequenciesList);
	const [preAmpDB, setPreAmpDB] = useState(0);

	const [showModal, setShowModal] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleBandGain = async (band: number, level: number) => {
		try {
			await AudioEqualizerModule.setBandGain(band, level);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePreAmpGain = async (level: number) => {
		try {
			await AudioEqualizerModule.setInputGain(level);
		} catch (error) {
			console.log(error);
		}
	};

	const handlePreAmpDB = (level: number) => {
		setPreAmpDB(level);
	};

	const handleValueChange = (index: number, value: number) => {
		const updatedFrequencies = [...frequencies];
		updatedFrequencies[index].decibelQuantity = value;
		setFrequencies(updatedFrequencies);
		adjustAudio(index, value);
	};

	const adjustAudio = (index: number, value: number) => {
		handleBandGain(index, value);

		console.log(
			`Ajustando frequência ${frequencies[index].frequency} para ${value} dB`
		);
	};

	useEffect(() => {
		handlePreAmpGain(preAmpDB);
	}, [preAmpDB]);

	return (
		<>
			<S.Container>
				<S.Header>
					<Text variant="bold">Equalizador</Text>

					<View
						style={{
							flexDirection: 'row'
						}}>
						<TouchableOpacity
							onPress={() => {
								setIsEditing(false);
								setShowModal(true);
							}}>
							<Icons.Plus width={scale(32)} height={scale(32)} />
						</TouchableOpacity>

						<Spacer w={16} />

						<TouchableOpacity
							onPress={() => {
								setIsEditing(true);
								setShowModal(true);
							}}>
							<Icons.Pencil
								width={scale(32)}
								height={scale(32)}
							/>
						</TouchableOpacity>
					</View>
				</S.Header>

				<S.ContainerBars>
					{frequencies.map((bar, index) => (
						<S.ContainerBar
							key={bar.frequency}
							style={{ width: 32 }}
							onTouchStart={() => handleScrollEnabled(false)}
							onTouchEnd={() => handleScrollEnabled(true)}
							onTouchCancel={() => handleScrollEnabled(true)}>
							<VerticalSlider
								min={-12}
								max={12}
								step={1}
								value={bar.decibelQuantity}
								onValueChange={value =>
									handleValueChange(index, value)
								}
							/>

							<Spacer h={16} />
							<Text fontSize={12}>{bar.frequency}</Text>
						</S.ContainerBar>
					))}
				</S.ContainerBars>

				<Spacer h={16} />

				<Text fontSize={12} style={{ textAlign: 'center' }}>
					PREAMP/dB
				</Text>

				<Spacer h={16} />

				<S.ContainerSlider>
					<Text fontSize={12}>-12</Text>

					<View
						style={{
							height: 2,
							width: '80%',
							justifyContent: 'center',
							alignItems: 'center'
						}}
						onTouchStart={() => handleScrollEnabled(false)}
						onTouchEnd={() => handleScrollEnabled(true)}
						onTouchCancel={() => handleScrollEnabled(true)}>
						<Slider
							minimumValue={-12}
							maximumValue={12}
							step={1}
							value={preAmpDB}
							onValueChange={value => handlePreAmpDB(value)}
							minimumTrackTintColor="transparent"
							maximumTrackTintColor="transparent"
							thumbTintColor="#242424"
							style={{
								width: '100%',
								height: 2
							}}
						/>
						<View
							style={{
								position: 'absolute',
								width: '90%',
								height: 2,
								backgroundColor: '#242424',
								zIndex: -10
							}}
						/>
					</View>

					<Text fontSize={12}>+12</Text>
				</S.ContainerSlider>

				<Spacer h={16} />
			</S.Container>

			<ModalPreset
				isEdit={isEditing}
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/>
		</>
	);
};
