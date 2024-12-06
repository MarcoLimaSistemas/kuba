import React, { useMemo, useRef, useState } from 'react';

import { Button } from '@components/Button';

import {
	Container,
	ContainerBody,
	ContainerEqualizer,
	ImageProfile,
	ContainerImage,
	ContainerCarousel
} from './styles';
import Text from '@components/Text';


import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { Modalize } from 'react-native-modalize';
import { ElementConnectedDevice } from '@components/ElementConnectedDevice';
import { HeaderEqualizer } from '@components/Equalizer/Header';
import EqualizerVisual from '@components/Equalizer/ui/equalizer';
import { useBluetooth } from '../../../context/BluetoothContext';
import { IPreset } from '@models/preset';


export function Preset() {
	const navigation = useNavigation();
	const route = useRoute();

	const { preset } = route.params as any;

	const listFrequencies = preset.data as IPreset

	const modalizeRef = useRef<Modalize>(null);

	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [currentPreset, setCurrentPreset] = useState<IPreset | null>(null);

	const { state } = useBluetooth();

	const openModal = () => modalizeRef.current?.open();


	const handleScrollEnabled = (enabled: boolean) => {
		setScrollEnabled(enabled);
	};

	const handlePreset = (preset: IPreset) => {
		//setCurrentPreset(preset);
	};


	return (
		<Container
			from={{
				translateY: -128,
				opacity: 0.5,
			}}
			animate={{
				translateY: 0,
				opacity: 1,
			}}
		>
			<ContainerImage>
				<LinearGradient
					colors={['transparent', '#f4f2f2']}
					style={{
						position: 'absolute',
						left: 0,
						right: 0,
						bottom: 0,
						height: scale(80),
						zIndex: 101
					}}
				/>

				<ImageProfile
					source={{
						uri: "https://kuba-staging-api-files.s3.sa-east-1.amazonaws.com/preset/808-1"
					}}
				/>

				<Text
					color="#656565"
					variant="bold"
					style={{
						zIndex: 1111,
						textAlign: 'center',
						textTransform: 'uppercase',
						letterSpacing: scale(8)
					}}>
					{preset.name}
				</Text>
			</ContainerImage>

			<Spacer h={14} />

			<ElementConnectedDevice
				isNavigateHome
				connectToDevice={() => { }}
				connectedDevice={state.device ? state.device : null}
			/>

			<Spacer h={16} />

			<ContainerBody>
				<ContainerEqualizer>
					<HeaderEqualizer
						disabled
						onOpen={openModal}
						handleModalEdit={(isEdit: boolean) => { }}
						handleScrollEnabled={handleScrollEnabled}
						handlePreset={handlePreset}
						presetCustom={listFrequencies.name ?? ""}
						equalizerConfigs={listFrequencies.equalizerConfigs}
					/>
					{
						listFrequencies && (
							<EqualizerVisual
								disabled
								frequency={listFrequencies.equalizerConfigs[0].frequency ?? 0}
								gain={listFrequencies.equalizerConfigs[0]?.decibel_quantity ?? 0}
								quality={listFrequencies.equalizerConfigs[0]?.quality ?? 0}
								minFrequency={0.2}
								maxFrequency={20000}
								optionBand={'1'}
								disabledFrequency={true}
								disabledGain={true}
								disabledQuality={true}
								onSelect={() => { }}
							/>
						)
					}

				</ContainerEqualizer>

				<Spacer h={16} />

				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</ContainerBody>
		</Container>
	);
}
