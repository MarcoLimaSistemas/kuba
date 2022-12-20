import React from 'react';
import { ReactNode, useState } from 'react';
import { Control, FieldError, useController } from 'react-hook-form';
import { TextInputProps } from 'react-native';

import { Container, ContainerInput, Error, TextInput } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  title: string;
  icon?: ReactNode;
  control?: Control<any>;
  errors?: FieldError;
  defaultValue?: string;
  showPasswordIconVisibility?: boolean;
  isActivePassword?: boolean;
}

export function Input({
  name,
  title,
  icon,
  control,
  errors,
  defaultValue,
  showPasswordIconVisibility,
  isActivePassword,
  ...rest
}: InputProps) {
  const { field } = useController({
    control,
    defaultValue: defaultValue || '',
    name,
  });
  const [focus, setFocus] = useState(false);
  return (
    <Container>
      {icon && showPasswordIconVisibility ? (
        <>
          <TextInput>{title}</TextInput>
          <ContainerInput
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={field.value}
            isErrored={!!errors}
            isFocused={focus}
            onChangeText={field.onChange}
            {...rest}
          />
          {icon}
        </>
      ) : (
        <>
          <TextInput>{title}</TextInput>
          <ContainerInput
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={field.value}
            isErrored={!!errors}
            isFocused={focus}
            onChangeText={field.onChange}
            {...rest}
          />
        </>
      )}
      {errors && <Error>{String(errors?.message)}</Error>}
    </Container>
  );
}
