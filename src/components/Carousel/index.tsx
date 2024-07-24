import React from 'react';
import { CardDevice } from '@components/CardDevice';
import { FlatList, View } from 'react-native';
import { CarouselProps } from '@models/device';
import { Spacer } from '@components/Spacer';
import { Icons } from '@assets/icons';
import Text from '@components/Text';

import * as S from './styles';

export function Carousel({ data }: CarouselProps) {
	return (
		<S.Container>
			<Text color="#656565" variant="bold" fontSize={18}>
				Meus Dispositivos
			</Text>

			<Spacer h={16} />

			<FlatList
				data={data}
				showsHorizontalScrollIndicator={false}
				horizontal
				renderItem={({ item }) => (
					<View
						style={{ elevation: 8, marginRight: 8 }}
						key={item.id}>
						<CardDevice title={item.nome} id={item.id} />
					</View>
				)}
				ListFooterComponent={
					<S.ButtonAdd>
						<Icons.Plus />

						<Text style={{ textAlign: 'center' }} fontSize={14}>
							Adicionar novo dispositivo
						</Text>
					</S.ButtonAdd>
				}
			/>
		</S.Container>
	);
}
