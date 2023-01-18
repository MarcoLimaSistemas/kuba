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
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  activeButtonGoBack?: boolean;
  title: string;
}

export function Header({ activeButtonGoBack, title }: Props) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <ContainerIHeaderShadow marginTop={`${insets.top}px`}>
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