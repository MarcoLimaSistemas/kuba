import React from 'react';

import { Button } from '@components/Button';
import { Puppet } from '../../../assets/images';
import { Container, Image, TextConfirmed } from './styles';
export function ScreenSuccessful() {
  return (
    <Container>
      <Image source={Puppet} />
      <TextConfirmed>CADASTRO REALIZADO COM SUCESSO!</TextConfirmed>
      <Button title="Finalizar" />
    </Container>
  );
}
