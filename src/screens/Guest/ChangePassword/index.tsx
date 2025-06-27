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

import { useAuth } from '@hooks/auth';

import {
  Container,
  ContainerButtons,
  ScrollAwareView,
  TextError,
  Title,
} from './styles';

export function ChangePassword() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(true);

  const { emailForgetPassword, validateToken, updatePassword } = useAuth();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordProps>({
    resolver: yupResolver(ChangePasswordAndToken),
  });

  async function onVerificationCode(data: string) {
    const payload = {
      email: emailForgetPassword,
      token: data,
    };

    try {
      setLoading(true);
      await validateToken(payload);
    } catch (err) {
      navigation.goBack();
    }
    finally {
      setLoading(false);
    }
  }

  async function onSubmitChangePassword(data: ChangePasswordProps) {
    const payload = {
      email: emailForgetPassword,
      token: data.token,
      password: data.password,
      password_confirm: data.passwordConfirmation,
    };

    try {
      setLoading(true);
      await updatePassword(payload);
      navigation.navigate('ScreenSuccessfulResetPassword');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header title="Alteração de senha"
      //activeButtonGoBack={true}
      />
      <ScrollAwareView>

        <Title>
          Enviamos um token para o seu email. Caso não encontre, por favor, verifique a caixa de spam.
        </Title>

        <InputMasked
          onBlur={() => onVerificationCode(getValues('token'))}
          type="custom"
          options={{
            mask: '999999',
          }}
          keyboardType="numeric"
          control={control}
          label="Token"
          name="token"
          placeholder="Digite o token"
          error={
            errors.token && <TextError>{errors.token.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label="Senha"
          name="password"
          eye={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          secureTextEntry={showPassword}
          placeholder="Digite sua senha"
          error={
            errors.password && <TextError>{errors.password.message}</TextError>
          }
        />

        <InputUnMasked
          control={control}
          label="Repetir senha"
          name="passwordConfirmation"
          eye={true}
          secureTextEntry={showConfirmedPassword}
          showPassword={showConfirmedPassword}
          setShowPassword={setShowConfirmedPassword}
          placeholder="Confirme sua senha"
          error={
            errors.passwordConfirmation && <TextError>{errors.passwordConfirmation.message}</TextError>
          }
        />

        <ContainerButtons>
          <Button
            title="Finalizar"
            variant="primary"
            activeLoad={loading}
            onPress={handleSubmit(onSubmitChangePassword)}
          />

          <Button
            title="Voltar"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </ContainerButtons>
      </ScrollAwareView>
    </Container>
  );
}
