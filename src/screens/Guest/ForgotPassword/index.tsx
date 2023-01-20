import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { InputUnMasked } from '@components/InputUnMasked';

import {
  Container,
  ContainerButtons,
  ScrollAwareView,
  TextError,
  Title
} from './styles';

import { ForgotPasswordProps } from '@models/ForgotPassword';
import { ForgotPasswordSchema } from '@schemas/forgotPassword';

export function ForgotPassword() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordProps>({
    resolver: yupResolver(ForgotPasswordSchema)
  })


  async function onSubmitForgotPassword(data: ForgotPasswordProps) {
    const payload = {
      email: data.email,
    }

    try {
      console.log(payload)
      setLoading(true)
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container>
      <Header title='Recuperação de senha' activeButtonGoBack={true} />
      <ScrollAwareView>

        <Title>
          Enviaremos um token para o email cadastrado para que possa alterar sua senha. Por favor, insira seu email.
        </Title>

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

      </ScrollAwareView>

      <ContainerButtons>
        <Button
          title='Enviar'
          variant='primary'
          activeLoad={loading}
          // onPress={handleSubmit(onSubmitForgotPassword)}
          onPress={() => navigation.navigate('ChangePassword')} />

        <Button
          title='Voltar'
          variant='secondary'
          onPress={() => navigation.goBack()}
        />
      </ContainerButtons>
    </Container>
  )
}