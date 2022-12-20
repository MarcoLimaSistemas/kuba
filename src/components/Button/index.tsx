import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { ButtonVariant, StyledButton, Title } from './styles';

interface Props extends TouchableOpacityProps {
  title: string;
  disabled?: boolean;
  variant?: ButtonVariant;
  activeLoad?: boolean;
}

export function Button({
  disabled,
  title,
  activeLoad,
  variant = 'primary',
  ...rest
}: Props) {
  return (
    <StyledButton disabled={disabled} variant={variant} {...rest}>
      {activeLoad ? (
        <ActivityIndicator color="#f2f2f2" size={20} />
      ) : (
        <>
          <Title variant={variant}>{title}</Title>
        </>
      )}
    </StyledButton>
  );
}
