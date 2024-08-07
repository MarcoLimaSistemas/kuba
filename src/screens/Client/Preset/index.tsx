import React from 'react';

import { Button } from '@components/Button';

import {
	Container,
	ContainerBody,
	ContainerEqualizer,
	ImageProfile,
	ContainerImage
} from './styles';
import Text from '@components/Text';
import { Equalizer } from '@components/Equalizer';
import { IPreset } from '@components/ModalPreset';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IFrequency } from '../Device';
import LinearGradient from 'react-native-linear-gradient';

export function Preset() {
	const navigation = useNavigation();

	const route = useRoute();

	const { preset } = route.params as any;

	return (
		<Container>
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
						uri: preset.imgURL
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

			<Spacer h={32} />

			<ContainerBody>
				<ContainerEqualizer>
					<Equalizer
						disabled
						handleScrollEnabled={(enabled: boolean) => {}}
						handlePreset={(preset: IPreset) => {}}
						handleModalEdit={(isEdit: boolean) => {}}
						onOpen={() => {}}
						handleFrequencies={(frequencies: IFrequency[]) => {}}
					/>
				</ContainerEqualizer>

				<Spacer h={16} />

				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</ContainerBody>
		</Container>
	);
}
