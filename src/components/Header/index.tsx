import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Image } from 'react-native';

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

export const styles = StyleSheet.create({
  shadowBorder: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 5,
  },
});
