import React, { ReactNode } from 'react';

import { singerPreset } from '@assets/images';
import { Button } from '@components/Button';
import { ButtonConnected } from '@components/ButtonConnected';
import { CarouselProfile } from '@components/CarouselProfile';

import {
  BoxImage,
  Container,
  ContainerCarousel,
  Footer,
  ImageProfile,
  NamePreset,
} from './styles';

interface PresetProps {
  children: ReactNode;
}

export function Preset() {
  const data = ['#173961', '#556d89', '#BFD5ee', '#Fcfeff'];
  return (
    <Container>
      <BoxImage>
        <ImageProfile source={singerPreset} />
        <NamePreset>Criolo</NamePreset>
      </BoxImage>
      <ButtonConnected />
      <ContainerCarousel>
        <CarouselProfile titleProfile={'Perfis Personalizados'} data={data} />
        <CarouselProfile titleProfile={'Perfis Públicos '} data={data} />
      </ContainerCarousel>
      <Footer>
        <Button title="Voltar" />
      </Footer>
    </Container>
  );
}
