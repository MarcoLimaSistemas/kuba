import React, { useState } from "react";
import { Image } from "react-native";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { InputControl } from "@components/InputControl";

import {
  BoxButtons,
  Container,
  InputsContainer,
  TextError
} from "./styles";


import { Eye, EyeOff } from '@assets/icons'
import { TouchableIcon } from "@screens/Guest/SignUp/styles";

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
          type={"custom"}
        />
        {errors?.currentPassword && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Nova senha"
          placeholder="Digite sua nova senha"
          keyboardType="default"
          name="newPassword"
          control={control}
          secureTextEntry={eyeNewPassword}
          type={"custom"}
          icon={
            <TouchableIcon
              onPress={() => setEyeNewPassword((prevState) => !prevState)}
            >
              {eyeNewPassword ?
                <Image source={Eye} /> :
                <Image source={EyeOff} />}
            </TouchableIcon>
          }
        />
        {errors.newPassword && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Repetir nova senha"
          placeholder="Digite sua nova senha"
          keyboardType="default"
          name="confirmationPassword"
          control={control}
          secureTextEntry={eyeConfirmationPassword}
          type={"custom"}
          icon={
            <TouchableIcon
              onPress={() => setEyeConfirmationPassword((prevState) => !prevState)}
            >
              {eyeConfirmationPassword ?
                <Image source={Eye} /> :
                <Image source={EyeOff} />}
            </TouchableIcon>
          }
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