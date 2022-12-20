import React from 'react';
import { ReactNode, useState } from 'react';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Input } from '@components/Input';

import { ScrollView } from 'react-native';
import { Container, InputsContainer, TouchableIcon } from './styles';
interface SignUpProps {
  children: ReactNode;
}

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header title="Cadastro" activeButtonGoBack={true} />

        <InputsContainer>
          <Input title="Nome" placeholder="Nome" />
          <Input
            title="E-mail"
            placeholder="E-mail"
            keyboardType="email-address" />
          <Input title="Data de Nascimento" placeholder="27/06/2022" />
          <Input
            title="Senha"
            placeholder="Senha"
            secureTextEntry={!showPassword}
            showPasswordIconVisibility
            isActivePassword
            icon={<TouchableIcon
              onPress={() => setShowPassword((prevState) => !prevState)}
            >
              {/* <Ionicons
                name={showPassword ? 'md-eye' : 'md-eye-off'}
                size={24}
                color="#00000099" /> */}
            </TouchableIcon>} />
          <Input
            title="Repetir Senha"
            placeholder="Senha"
            secureTextEntry={!showConfirmedPassword}
            showPasswordIconVisibility
            isActivePassword
            icon={<TouchableIcon
              onPress={() => setShowConfirmedPassword((prevState) => !prevState)}
            >
              {/* <Ionicons
                name={showConfirmedPassword ? 'md-eye' : 'md-eye-off'}
                size={24}
                color="#00000099" /> */}
            </TouchableIcon>} />

          <Button title="Enviar" variant="primary" />
          <Button title="Voltar" variant="secondary" />
        </InputsContainer>
      </ScrollView>
    </Container>
  );
}
