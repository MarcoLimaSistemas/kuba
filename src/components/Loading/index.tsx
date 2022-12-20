import { Container, Title } from './styles';

import { ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';
import React from 'react';

interface Props {
  title: string;
}
export function Loading({ title }: Props) {
  return (
    <Container>
      <Title>{title}</Title>
      <ActivityIndicator color={theme.COLORS.black} size={60} />
    </Container>
  );
}
