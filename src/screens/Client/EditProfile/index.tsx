import React, { useState } from "react"

import { Header } from "@components/Header"
import { BoxButtons, BoxPhoto, Container, InputsContainer, Photo, TextError, TextPhoto } from "./styles"

import { profile } from '@assets/images'
import { Button } from "@components/Button"
import { InputControl } from "@components/InputControl"
import { useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"


type FormData = {
  name: string;
  description: string;
  email: string;
  date: string;
  facebook: string;
  instagram: string;
  spotify: string;
  qobuzz: string;
};

export function EditProfile() {
  const navigation = useNavigation()
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <Container>
      <Header title="Editar perfil" activeButtonGoBack={true} />
      <BoxPhoto>
        <Photo source={profile} />
        <TextPhoto>Alterar foto de perfil</TextPhoto>
      </BoxPhoto>

      <InputsContainer>
        <InputControl
          label="Nome"
          placeholder="Digite seu nome"
          keyboardType="default"
          name="name"
          control={control}
        />
        {errors?.name && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Descrição"
          placeholder="Digite sua Descrição"
          keyboardType="default"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={350}
          name="description"
          rule={false}
          control={control}
        />
        {errors?.description && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="E-mail"
          placeholder="Digite seu melhor e-mail"
          keyboardType="email-address"
          name="email"
          control={control}
        />
        {errors?.email && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Data de nascimento"
          placeholder="Digite sua de data de nascimento"
          keyboardType="numeric"
          name="date"
          control={control}
          isMasked={true}
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY'
          }}
        />
        {errors?.date && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Facebook"
          placeholder="Digite seu facebook"
          keyboardType="url"
          name="facebook"
          rule={false}
          control={control}
        />
        {errors?.facebook && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Instagram"
          placeholder="Digite seu instagram"
          keyboardType="url"
          name="instagram"
          rule={false}
          control={control}
        />
        {errors?.instagram && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Spotify"
          placeholder="Digite seu spotify"
          keyboardType="url"
          name="spotify"
          rule={false}
          control={control}
        />
        {errors?.spotify && <TextError>Esse é um campo obrigatório.</TextError>}

        <InputControl
          label="Qobuzz"
          placeholder="Digite seu qobuzz"
          keyboardType="url"
          name="qobuzz"
          rule={false}
          control={control}
        />
        {errors?.qobuzz && <TextError>Esse é um campo obrigatório.</TextError>}

        <BoxButtons>
          <Button title="Enviar" variant="primary" onPress={handleSubmit(onSubmit)} />
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </BoxButtons>
      </InputsContainer>
    </Container>
  )
}