import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { InputControl } from "@components/InputControl";

import { BoxButtons, ButtonEyeConfirmationPassword, ButtonEyeNewPassword, Container, InputsContainer, TextError } from "./styles";
import { Image, TouchableOpacity } from "react-native";

import { Eye, EyeOff } from '@assets/icons'

type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
};

export function ChangePassword() {
  const navigation = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const [eyeNewPassword, setEyeNewPassword] = useState(true)
  const [eyeConfirmationPassword, setEyeConfirmationPassword] = useState(true)

  const onSubmit = (data: FormData) => {
    console.log(data)
    navigation.navigate('PasswordResetSuccess')
  }
  return (
    <Container>
      <Header title="Alterar senha" activeButtonGoBack={true} />
      <InputsContainer>
        <InputControl
          label="Senha atual"
          placeholder="Digite sua senha"
          keyboardType="default"
          name="currentPassword"
          control={control}
          secureTextEntry={true}
        />
        {errors?.currentPassword && <TextError>Esse é um campo obrigatório.</TextError>}

        {eyeNewPassword ?
          <ButtonEyeNewPassword onPress={() => setEyeNewPassword(false)}>
            <Image source={Eye} />
          </ButtonEyeNewPassword>
          : <ButtonEyeNewPassword onPress={() => setEyeNewPassword(true)}>
            <Image source={EyeOff} />
          </ButtonEyeNewPassword>
        }
        <InputControl
          label="Nova senha"
          placeholder="Digite sua nova senha"
          keyboardType="default"
          name="newPassword"
          control={control}
          secureTextEntry={eyeNewPassword}
        />
        {errors.newPassword && <TextError>Esse é um campo obrigatório.</TextError>}


        {eyeConfirmationPassword ?
          <ButtonEyeConfirmationPassword onPress={() => setEyeConfirmationPassword(false)}>
            <Image source={Eye} />
          </ButtonEyeConfirmationPassword>
          : <ButtonEyeConfirmationPassword onPress={() => setEyeConfirmationPassword(true)}>
            <Image source={EyeOff} />
          </ButtonEyeConfirmationPassword>
        }
        <InputControl
          label="Repetir nova senha"
          placeholder="Digite sua nova senha"
          keyboardType="default"
          name="confirmationPassword"
          control={control}
          secureTextEntry={eyeConfirmationPassword}
        />
        {errors.confirmationPassword && <TextError>Esse é um campo obrigatório.</TextError>}

      </InputsContainer>

      <BoxButtons>
        <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
        <Button title="Cancelar" variant="secondary" onPress={() => navigation.goBack()} />
      </BoxButtons>
    </Container>
  )
}