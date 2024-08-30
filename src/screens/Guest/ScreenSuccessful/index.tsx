import React from 'react';

import { Button } from '@components/Button';
import { Puppet } from '../../../assets/images';
import { Container, Image, TextConfirmed } from './styles';
import { useNavigation } from '@react-navigation/native';
export function ScreenSuccessful() {
  const navigation = useNavigation()
  return (
    <Container>
      <Image source={Puppet} />
      <TextConfirmed>{"CADASTRO REALIZADO\n COM SUCESSO!"}</TextConfirmed>
      <Button title="Finalizar" onPress={()=>navigation.navigate('SignIn')} />
    </Container>
  );
}
