import { singer } from '@assets/images';
import React from 'react';

import { Container, ImageBackground, Title } from './styles';

interface CardProfileProps {
  name: string;
}

export function CardProfile({ name }: CardProfileProps) {
  return (
    <Container>
      <ImageBackground source={singer} />
      <Title>{name}</Title>
    </Container>
  );
}
