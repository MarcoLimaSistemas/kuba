import React, { PropsWithChildren } from 'react';

import { KubaFone } from '@assets/images';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Box, Container, ContainerImage, Image, TitleCard } from './styles';

interface CardDeviceProps {
  title: string
  id: number
}

export function CardDevice({ title, id }: CardDeviceProps) {
  const { navigate } = useNavigation() as NavigationProp<ReactNavigation.RootParamList> | any

  return (
    <Container
      onPress={() => navigate('Device', { deviceID: id })}
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
