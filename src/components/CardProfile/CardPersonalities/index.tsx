import { singerPreset } from '@assets/images';
import React from 'react';
import { Container, ImageCouver, Name } from './styles';

export function CardPersonalities() {
  return (
    <Container>
      <ImageCouver source={singerPreset} />
      <Name>{'Crioulo'}</Name>
    </Container>
  );
}
