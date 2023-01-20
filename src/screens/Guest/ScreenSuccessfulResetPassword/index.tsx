import React from 'react';

import { Button } from '@components/Button';
import { Puppet } from '@assets/images';
import { Container, Image, TextConfirmed } from './styles';
import { useNavigation } from '@react-navigation/native';

export function ScreenSuccessfulResetPassword() {
  const navigation = useNavigation()

  return (
    <Container>
      <Image source={Puppet} />
      <TextConfirmed>ALTERAÇÃO REALIZADA COM SUCESSO!</TextConfirmed>
      <Button
        title="Finalizar"
        onPress={() => navigation.reset({
          index: 0,
          routes: [{ name: 'SignIn' }],
        })}
      />
    </Container>
  );
}
