import React from 'react';
import { Image } from 'react-native';
import {
  Container,
  Disconnected,
  HFlex,
  Percentage,
  TextStatus,
} from './styles';

import { Lighting } from '@assets/icons'
export function ButtonConnected() {
  return (
    <Container>
      <TextStatus>{'Conectado'}</TextStatus>
      <HFlex>
        <Image source={Lighting} />
        <Percentage>{'100%'}</Percentage>
      </HFlex>
      <Disconnected>{'Desconectar'}</Disconnected>
    </Container>
  );
}
