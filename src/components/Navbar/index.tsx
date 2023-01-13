import React from 'react';

import { logoWhite, perfil } from '@assets/images';
import { Container, Image } from './styles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export function Navbar() {
  const navigation = useNavigation();

  return (
    <Container>
      <Image source={logoWhite} />
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={perfil} />
      </TouchableOpacity>
    </Container >
  );
}
