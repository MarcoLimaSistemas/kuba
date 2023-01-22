import React from 'react';
import { CardDevice } from '@components/CardDevice';
import { FlatList } from 'react-native';
import { ContainerCarousel, MessageText, TitleCarousel } from './styles';
import { CarouselProps } from '@models/device';

export function Carousel({ data }: CarouselProps) {
  return (
    data.length === 0 ?
      <MessageText>Desculpe, no momento estamos sem dispositivos cadastrados!</MessageText>
      :
      <ContainerCarousel>
        <TitleCarousel>Meus Dispositivos</TitleCarousel>
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.id)}
          showsHorizontalScrollIndicator={false}
          horizontal
          snapToAlignment={'start'}
          scrollEventThrottle={14}
          renderItem={({ item }) => (
            <CardDevice key={item.id} title={item.nome} id={item.id} />
          )}
        />
      </ContainerCarousel>
  )
}
