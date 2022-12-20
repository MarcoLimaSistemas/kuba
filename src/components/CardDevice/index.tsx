import { KubaFone } from '@assets/images';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Box, Container, ContainerImage, Image, TitleCard } from './styles';

interface CardDeviceProps {
  title: string;
}

export function CardDevice({ title }: CardDeviceProps) {
  const navigation = useNavigation()
  return (
    <Container
      // onPress={() => navigation.navigate('', { PostId: postID })}
      onPress={() => navigation.navigate('Device')}
    >
      <ContainerImage>
        <Image source={KubaFone} />
      </ContainerImage>
      <Box>
        <TitleCard>{title}</TitleCard>
      </Box>
    </Container>
  );
}
