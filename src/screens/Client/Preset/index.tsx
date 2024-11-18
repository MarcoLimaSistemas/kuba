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
import { Equalizer, IFrequenciesListProps } from '@components/Equalizer';
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
import { Modalize } from 'react-native-modalize';
import { ElementConnectedDevice } from '@components/ElementConnectedDevice';
import { HeaderEqualizer } from '@components/Equalizer/Header';
import EqualizerVisual from '@components/Equalizer/ui/equalizer';



export function Preset() {
	const navigation = useNavigation();
	const route = useRoute();
	const { user } = useAuth();
	const { preset } = route.params as any;

	const modalizeRef = useRef<Modalize>(null);

	const [scrollEnabled, setScrollEnabled] = useState(true);
	const [currentPreset, setCurrentPreset] = useState<IPreset | null>(null);
	const [currentFrequencies, setCurrentFrequencies] = useState<IFrequency[]>(
		[]
	);


	const openModal = () => modalizeRef.current?.open();


	const { data: personalitiesData, isFetched } = useQuery({
		queryKey: ['PersonalitiesOnDeviceScreen',preset.id],
		queryFn: () => getPresets(user?.id, undefined, 1, false, 5)
	});

	const personalities = useMemo(() => {
		return personalitiesData?.data ?? [];
	}, [personalitiesData]);

	const { data: profilesData } = useQuery({
		queryKey: ['PresetsPublicsOnDeviceScreen'],
		queryFn: () => getPresetsPublics(user?.id, undefined, 1, 5),
		enabled: isFetched
	});

	const profiles = useMemo(() => {
		return profilesData?.data ?? [];
	}, [profilesData]);

	const handleScrollEnabled = (enabled: boolean) => {
		setScrollEnabled(enabled);
	};

	const handlePreset = (preset: IPreset) => {
		setCurrentPreset(preset);
	};

	const handleFrequencies = (frequencies: IFrequency[]) => {
		setCurrentFrequencies(frequencies);
	};

  const filtered = personalities.filter((item) => item.id === preset.id)

  const listFrequencies = filtered[0]?.equalizerConfigs?.map((item)=> {
		return item
  })

//console.log('filtered',filtered)

	//console.log("listFrequencies",listFrequencies )

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

			<Spacer h={14} />

			<ElementConnectedDevice
			 connectedDevice={null} 
			 />

			<Spacer h={16} />

			<ContainerBody>
				<ContainerEqualizer>
				 <HeaderEqualizer 
					disabled
					onOpen={openModal}
					handleModalEdit={(isEdit: boolean) => {}}
					handleScrollEnabled={handleScrollEnabled}
					handlePreset={handlePreset}
					presetCustom={filtered[0].name}
				//	frequenciesList={listFrequencies}
					/> 
			{
			listFrequencies &&(
				<EqualizerVisual
					disabled
     		 frequency={listFrequencies[0]?.frequency ?? 0}
     		 gain={listFrequencies[0]?.decibel_quantity ?? 0}
     		 quality={listFrequencies[0]?.quality ?? 0}
     		 minFrequency={0.2}
     		 maxFrequency={20000}
     		 optionBand={'1'}
     		 disabledFrequency={true}
     		 disabledGain={true}
     		 disabledQuality={true}
     		onSelect={()=>{}}
     		 />
				)
			}
			
		
{/* 					
					 <Equalizer
						disabled
						onOpen={openModal}
						handleModalEdit={(isEdit: boolean) => {}}
						handleFrequencies={handleFrequencies}
						handlePreset={handlePreset}
						handleScrollEnabled={handleScrollEnabled}
						frequenciesList={listFrequencies}
					/>   */}
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
