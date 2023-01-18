import React from 'react';
import { CardDevice } from '@components/CardDevice';
import { Dimensions, FlatList } from 'react-native';

import { CardContainer } from './styles';

interface CarouselProps {
  data: DeviceProps[];
}

interface DeviceProps {
  id: number;
  name: string;
}

const { width } = Dimensions.get('window');

export function Carousel({ data }: CarouselProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => String(item.id)}
      showsHorizontalScrollIndicator={false}
      horizontal
      snapToAlignment={'start'}
      scrollEventThrottle={14}
      renderItem={({ item }) => (
        <CardDevice key={item.id} title={item.name} />
      )}
    />
  );
}
