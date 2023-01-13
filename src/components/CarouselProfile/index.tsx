import { CardProfile } from '@components/CardProfile';
import React from 'react';
import { Dimensions, FlatList, View } from 'react-native';

import { Container, Title } from './styles';

interface CarouselProfileProps {
  data: any;
  titleProfile: string;
}
const { width } = Dimensions.get('window');
export function CarouselProfile({ data, titleProfile }: CarouselProfileProps) {
  return (
    <Container>
      <Title>{titleProfile}</Title>

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
                width: width * 0.4 - 50,
                marginHorizontal: 20,
                borderRadius: 12,
              }}
            >
              <CardProfile name={item.name} />
            </View>
          </>
        )}
      />
    </Container>
  );
}
