import React from "react"

import { Header } from "@components/Header"
import {
  BoxButtons,
  BoxPhoto,
  Container,
  InputsContainer,
  Photo,
  TextError,
  TextPhoto
} from "./styles"

import { profile } from '@assets/images'
import { Button } from "@components/Button"
import { useForm } from "react-hook-form"
import { useNavigation } from "@react-navigation/native"
import { InputUnMasked } from "@components/InputUnMasked"
import { InputMasked } from "@components/InputMasked"
import { yupResolver } from "@hookform/resolvers/yup"
import { EditProfileSchema } from "../../../schemas/editProfile"


type FormData = {
  name: string;
  description: string;
  email: string;
  birthDate: string;
  facebook: string;
  instagram: string;
  spotify: string;
  qobuzz: string;
};

export function EditProfile() {
  const navigation = useNavigation()

  const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(EditProfileSchema)
  });

  const onSubmit = (data: FormData) => console.log(data);

  return (
    <Container>
      <Header title="Editar perfil" activeButtonGoBack={true} />
      <BoxPhoto>
        <Photo source={profile} />
        <TextPhoto>Alterar foto de perfil</TextPhoto>
      </BoxPhoto>

      <InputsContainer>
        <InputUnMasked
          control={control}
          label='Nome'
          name='name'
          placeholder='Digite seu nome'
          error={
            errors.name && <TextError>{errors.name.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Descrição'
          name='description'
          placeholder="Digite sua Descrição"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          error={
            errors.description && <TextError>{errors.description.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='E-mail'
          name='email'
          placeholder='Digite seu e-mail'
          keyboardType='email-address'
          error={
            errors.email && <TextError>{errors.email.message}</TextError>
          }
        />

        <InputMasked
          type='custom'
          options={{
            mask: '99/99/9999'
          }}
          keyboardType='numeric'
          control={control}
          label='Data de nascimento'
          name='birthDate'
          placeholder='Digite sua data de nascimento'
          error={
            errors.birthDate && <TextError>{errors.birthDate.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Facebook'
          name='facebook'
          placeholder="Digite seu facebook"
          error={
            errors.facebook && <TextError>{errors.facebook.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Instagram'
          name='instagram'
          placeholder="Digite seu instagram"
          error={
            errors.instagram && <TextError>{errors.instagram.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Spotify'
          name='spotify'
          placeholder="Digite seu spotify"
          error={
            errors.spotify && <TextError>{errors.spotify.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Qobuzz'
          name='qobuzz'
          placeholder="Digite seu qobuzz"
          error={
            errors.qobuzz && <TextError>{errors.qobuzz.message}</TextError>
          }
        />

        <BoxButtons>
          <Button title="Enviar" onPress={handleSubmit(onSubmit)} />
          <Button title="Voltar" variant="secondary" onPress={() => navigation.goBack()} />
        </BoxButtons>
      </InputsContainer>
    </Container>
  )
}