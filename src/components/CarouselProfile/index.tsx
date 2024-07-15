import { CardProfile } from '@components/CardProfile';
import React from 'react';
import { FlatList, View } from 'react-native';

import { Container, Title } from './styles';

interface CarouselProfileProps {
  data: any;
  titleProfile: string;
}

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
                height: 40,
                width:104,
                marginHorizontal: 8,
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
