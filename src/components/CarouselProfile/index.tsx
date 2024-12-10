import { CardProfile } from '@components/CardProfile';
import { FlatList } from 'react-native';
import React from 'react';

import { Spacer } from '@components/Spacer';
import Text from '@components/Text';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';
import { IPreset } from '@models/preset';

interface CarouselProfileProps {
	data: IPreset[];
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
						key={item.id}
						data={item}
					/>

				)}
				ListFooterComponent={() => (
					<>
					</>
				)}
			/>
		</>
	);
}
