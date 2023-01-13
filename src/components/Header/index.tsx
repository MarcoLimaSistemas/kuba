import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';

import {
  ButtonBack,
  ContainerIHeaderShadow,
  ContainerLogo,
  ContainerShadow,
  Title,
} from './styles';

import { ArrowBack } from '@assets/icons'

interface Props {
  activeButtonGoBack?: boolean;
  title: string;
}

export function Header({ activeButtonGoBack, title }: Props) {
  const navigation = useNavigation();

  return (
    <ContainerIHeaderShadow>
      <ContainerShadow>
        {activeButtonGoBack && (
          <ButtonBack onPress={() => navigation.goBack()}>
            <Image source={ArrowBack} />
          </ButtonBack>
        )}

        <ContainerLogo activeButtonGoBack={activeButtonGoBack}>
          <Title>{title}</Title>
        </ContainerLogo>
      </ContainerShadow>
    </ContainerIHeaderShadow>
  );
}