import React from 'react';
import { CardDevice } from '@components/CardDevice';
import { FlatList, View } from 'react-native';
import { CarouselProps } from '@models/device';
import { Spacer } from '@components/Spacer';
import { Icons } from '@assets/icons';
import Text from '@components/Text';

import * as S from './styles';
import { scale } from 'react-native-size-matters';

export function Carousel({ data }: CarouselProps) {
	return (
		<>
			<Text
				color="#656565"
				variant="bold"
				fontSize={18}
				style={{ marginLeft: scale(16) }}>
				Meus Dispositivos
			</Text>

			<Spacer h={16} />

			<FlatList
				data={data}
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{
					paddingLeft: scale(16)
				}}
				horizontal
				renderItem={({ item }) => (
					<CardDevice key={item.id} title={item.nome} id={item.id} />
				)}
				ListFooterComponent={
					<S.ButtonAdd
						style={{
							elevation: 8,
							marginVertical: scale(4),
							marginRight: scale(8)
						}}>
						<Icons.Plus />

						<Text style={{ textAlign: 'center' }} fontSize={14}>
							Adicionar novo dispositivo
						</Text>
					</S.ButtonAdd>
				}
			/>
		</>
	);
}
