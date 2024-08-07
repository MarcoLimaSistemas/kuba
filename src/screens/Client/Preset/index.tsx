import React from 'react';

import { singerPreset } from '@assets/images';
import { Button } from '@components/Button';

import {
	BoxImage,
	Container,
	ContainerBody,
	ContainerEqualizer,
	ImageProfile
} from './styles';
import Text from '@components/Text';
import { Equalizer } from '@components/Equalizer';
import { IPreset } from '@components/ModalPreset';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { useNavigation } from '@react-navigation/native';

export function Preset() {
	const navigation = useNavigation();

	return (
		<Container>
			<BoxImage>
				<ImageProfile source={singerPreset} />
				<Text
					color="#656565"
					variant="bold"
					style={{
						textAlign: 'center',
						textTransform: 'uppercase',
						letterSpacing: scale(8)
					}}>
					Crioulo
				</Text>
			</BoxImage>

			<Spacer h={16} />

			<ContainerBody>
				<ContainerEqualizer>
					<Equalizer
						disabled
						handleScrollEnabled={function (
							enabled: boolean
						): void {}}
						handlePreset={function (preset: IPreset): void {}}
						handleModalEdit={function (isEdit: boolean): void {}}
						onOpen={function (): void {}}
					/>
				</ContainerEqualizer>

				<Spacer h={16} />

				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</ContainerBody>
		</Container>
	);
}
