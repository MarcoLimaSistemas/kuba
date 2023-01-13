import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Controller, useForm } from 'react-hook-form'
import { Image } from 'react-native'

import { Button } from '@components/Button'

import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '@hooks/auth'

import { ISignInCredentials } from 'src/models/auth'

import { logo } from '../../../assets/images'
import { Eye, EyeOff } from '../../../assets/icons'

import {
  Container,
  ContainerButton,
  ContainerLogo,
  ForgotPassword,
  ForgotPasswordButton,
  InputArea,
  InputGroup,
  InputsContainer,
  Input,
  TouchableIcon,
  InputLabel,
  Content,
  Error,
} from './styles'

import { SignInSchema } from '../../../schemas/auth'

export function SignIn() {
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()

  const [showPassword, setShowPassword] = useState(true)

  const { signIn } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<ISignInCredentials>({
    resolver: yupResolver(SignInSchema)
  })

  async function handleLogin(data: ISignInCredentials) {
    try {
      setLoading(true)
      await signIn(data)
    } catch (err: any) {
      setLoading(false)
      alert(err.message)
    }
  }
  return (
    <Container>
      <Content>
        <ContainerLogo>
          <Image source={logo} />
        </ContainerLogo>

        <InputsContainer>
          <InputGroup>
            <InputLabel>E-mail</InputLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputArea>
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    keyboardType='email-address'
                  />
                </InputArea>
              )}
              name="email"
            />
            {errors.email && <Error>{errors.email.message}</Error>}
          </InputGroup>

          <InputGroup>
            <InputLabel>Senha</InputLabel>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputArea>
                  <Input
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    secureTextEntry={showPassword}
                  />

                  <TouchableIcon
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ?
                      <Image source={EyeOff} /> :
                      <Image source={Eye} />}
                  </TouchableIcon>
                </InputArea>
              )}
              name="password"
            />
            {errors.password && <Error>{errors.password.message}</Error>}
          </InputGroup>

          <ForgotPasswordButton>
            <ForgotPassword>Esqueci minha senha?</ForgotPassword>
          </ForgotPasswordButton>
        </InputsContainer>

        <ContainerButton>
          <Button
            title="Entrar"
            variant="primary"
            activeLoad={loading}
            onPress={handleSubmit(handleLogin)}
          />

          <Button
            title="Criar Conta"
            variant="secondary"
            onPress={() => navigation.navigate('SignUp')}
          />
        </ContainerButton>
      </Content>
    </Container >
  )
}
