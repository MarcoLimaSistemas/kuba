import React from 'react';
import { ReactNode, useState } from 'react';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Input } from '@components/Input';

import { Container, Content, InputsContainer, TouchableIcon } from './styles';

interface SignUpProps {
  children: ReactNode;
}

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

  return (
    <Container>
      <Header title="Cadastro" activeButtonGoBack={true} />
      <Content>


      </Content>
    </Container>
  );
}
