import React from "react";
import { Image } from "react-native";
import { Container, TextSuccess } from "./styles";

import { passwordResetSuccess } from '@assets/images'
import { useNavigation } from "@react-navigation/native";
import { Button } from "@components/Button";

export function PasswordResetSuccess() {
  const navigation = useNavigation()
  return (
    <Container>
      <Image source={passwordResetSuccess} />
      <TextSuccess>Senha Alterada com sucesso!</TextSuccess>
      <Button title="Finalizar" onPress={() => navigation.navigate('Home')} />
    </Container>
  )
}