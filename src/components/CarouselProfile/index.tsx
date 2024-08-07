import { CardProfile } from '@components/CardProfile';
import { FlatList } from 'react-native';
import React from 'react';

import { ButtonViewGallery } from './styles';
import { Spacer } from '@components/Spacer';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

interface CarouselProfileProps {
	data: any;
	titleProfile: string;
	isPersonalities?: boolean;
}

export function CarouselProfile({
	data,
	titleProfile,
	isPersonalities = true
}: CarouselProfileProps) {
	const navigation = useNavigation();

	return (
		<>
			<Text color="#777777" variant="bold" fontSize={14}>
				{titleProfile}
			</Text>

			<FlatList
				data={data}
				keyExtractor={item => String(item.id)}
				contentContainerStyle={{
					paddingVertical: scale(8)
				}}
				showsHorizontalScrollIndicator={false}
				horizontal
				ItemSeparatorComponent={() => <Spacer w={16} />}
				renderItem={({ item }) => (
					<CardProfile
						name={item.name}
						imgURL={
							isPersonalities
								? item.img_url
								: item.client.profile_url
						}
					/>
				)}
				ListFooterComponent={() => (
					<>
						<ButtonViewGallery
							style={{
								backgroundColor: '#FFF',
								borderRadius: 8,
								elevation: 6,
								marginHorizontal: scale(16)
							}}
							onPress={() =>
								isPersonalities
									? navigation.navigate('Personalities')
									: navigation.navigate('Profiles')
							}>
							<Text color="#6E6E6E" fontSize={12} variant="bold">
								Acessar galeria
							</Text>
						</ButtonViewGallery>
					</>
				)}
			/>
		</>
	);
}
