import { CardDevice } from '@components/CardDevice';
import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';

import { Container } from './styles';

interface CarouselProps {
  data: any;
}
const { width } = Dimensions.get('window');
export function Carousel({ data }: CarouselProps) {
  return (
    <Container>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToAlignment={'start'}
        scrollEventThrottle={15}
        renderItem={({ item }) => (
          <>
            <View
              style={{
                height: width / 2.1,
                width: width * 0.5 - 40,
                marginHorizontal: 8,
                borderRadius: 12,
              }}
            >
              <CardDevice title={'Disco'} />
            </View>
          </>
        )}
      />
    </Container>
  );
}
