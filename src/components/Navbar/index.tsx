import React from 'react';

import { logoGray, logoWhite, perfil } from '@assets/images';
import { Container, Image } from './styles';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface NavbarProps {
  darkTheme?: boolean;
}

export function Navbar({ darkTheme }: NavbarProps) {
  const navigation = useNavigation();

  return (
    <Container>
      {darkTheme ? <Image source={logoWhite} /> : <Image source={logoGray} />}

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image source={perfil} />
      </TouchableOpacity>
    </Container >
  );
}
