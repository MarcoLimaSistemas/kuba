import React from 'react';

import { IconType } from 'react-icons';
import { Container, Icon, StyledButton, Title } from './styles';

interface ButtonActionProps {
  title: string;
  icon: IconType;
}

export function ButtonAction({ title, icon }: ButtonActionProps) {
  return (
    <Container>
      <StyledButton>
        <Icon name={icon} />
      </StyledButton>
      <Title>{title}</Title>
    </Container>
  );
}
