import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';

import { Header } from '@components/Header';
import { Button } from '@components/Button';

import { InputUnMasked } from '@components/InputUnMasked';
import { InputMasked } from '@components/InputMasked';

import { ChangePasswordProps } from '@models/ChangePassword';
import { ChangePasswordAndToken } from '@schemas/changePassword';

import {
  Container,
  ContainerButtons,
  ScrollAwareView,
  TextError,
  Title
} from './styles';



export function ChangePassword() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(true)


  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordProps>({
    resolver: yupResolver(ChangePasswordAndToken)
  })

  async function onSubmitChangePassword(data: ChangePasswordProps) {
    const payload = {
      token: data.token,
      password: data.passwordConfirmation,
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
      <Header title='Alteração de senha' activeButtonGoBack={true} />
      <ScrollAwareView>

        <Title>
          Enviamos um token para o seu email. Caso não encontre, por favor, verifique a caixa de spam.
        </Title>

        <InputMasked
          type='custom'
          options={{
            mask: '999999'
          }}
          keyboardType='numeric'
          control={control}
          label='Token'
          name='token'
          placeholder='Digite o token'
          error={
            errors.token && <TextError>{errors.token.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Senha'
          name='password'
          eye={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          secureTextEntry={showPassword}
          placeholder='Digite sua senha'
          error={
            errors.password && <TextError>{errors.password.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label='Repetir senha'
          name='passwordConfirmation'
          eye={true}
          secureTextEntry={showConfirmedPassword}
          showPassword={showConfirmedPassword}
          setShowPassword={setShowConfirmedPassword}
          placeholder='Confirme sua senha'
          error={
            errors.passwordConfirmation && <TextError>{errors.passwordConfirmation.message}</TextError>
          }
        />

        <ContainerButtons>
          <Button
            title='Finalizar'
            variant='primary'
            activeLoad={loading}
            // onPress={handleSubmit(onSubmitChangePassword)}
            onPress={() => navigation.navigate('ScreenSuccessfulResetPassword')}
          />

          <Button
            title='Voltar'
            variant='secondary'
            onPress={() => navigation.goBack()}
          />
        </ContainerButtons>
      </ScrollAwareView>
    </Container>
  )
}