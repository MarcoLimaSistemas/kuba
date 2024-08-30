import React, { useMemo } from 'react';

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
import { Equalizer } from '@components/Equalizer';
import { IPreset } from '@components/ModalPreset';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IFrequency } from '../Device';
import LinearGradient from 'react-native-linear-gradient';
import { CarouselProfile } from '@components/CarouselProfile';
import { useQuery } from '@tanstack/react-query';
import { getPresets, getPresetsPublics } from '@services/preset';
import { useAuth } from '@hooks/auth';

export function Preset() {
	const navigation = useNavigation();

	const route = useRoute();
	const { user } = useAuth();
	const { data: personalitiesData, isFetched } = useQuery({
		queryKey: ['PersonalitiesOnDeviceScreen'],
		queryFn: () => getPresets(user?.id, undefined, 1, false, 5)
	});

	const personalities = useMemo(() => {
		return personalitiesData?.data ?? [];
	}, [personalitiesData]);

	const { preset } = route.params as any;
	const { data: profilesData } = useQuery({
		queryKey: ['PresetsPublicsOnDeviceScreen'],
		queryFn: () => getPresetsPublics(user?.id, undefined, 1, 5),
		enabled: isFetched
	});

	const profiles = useMemo(() => {
		return profilesData?.data ?? [];
	}, [profilesData]);

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
						<ContainerCarousel>
						<CarouselProfile
								titleProfile={'Perfis Personalidades'}
								data={personalities}
							/>

							<Spacer h={16} />

							<CarouselProfile
								titleProfile={'Perfis Públicos '}
								data={profiles}
								isPersonalities={false}
							/>
							</ContainerCarousel>
				</ContainerEqualizer>

				<Spacer h={16} />

				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</ContainerBody>
		</Container>
	);
}
