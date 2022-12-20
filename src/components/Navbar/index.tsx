import React from 'react';

import { logo, perfil } from '@assets/images';
import { Container, Image } from './styles';

export function Navbar() {
  return (
    <Container>
      <Image source={logo} />

      <Image source={perfil} />
    </Container>
  );
}
