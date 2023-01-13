import React, { ReactNode } from "react"

import { Control, Controller, FieldError } from "react-hook-form";
import { InputMasked, InputUnMasked, InputControlContainer, Label, TextSizes, Error } from "./styles"
import { TextInputMaskProps } from "react-native-masked-text";

interface InputControlProps extends TextInputMaskProps {
  isMasked?: boolean;
  label: string;
  name: string;
  masked?: string;
  control: Control<FormData | any>;
  rule?: boolean;
  typePassword?: boolean;
  openPassword?: boolean;
  icon?: ReactNode;
  errors?: ReactNode;
}

export function InputControl({
  label,
  rule = true,
  multiline = false,
  name,
  control,
  isMasked = false,
  typePassword = false,
  openPassword,
  icon,
  errors,
  ...props }: InputControlProps) {

  return (
    <InputControlContainer>
      <Label>{label}</Label>
      <Controller
        control={control}
        rules={{
          required: rule,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          isMasked ? <InputMasked
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            {...props}
          />
            : <InputUnMasked
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              {...props}
            />
        )}
        name={name}
      />
      {icon}
      {multiline && <TextSizes>max {props.maxLength} caracteres</TextSizes>}
      {errors}
    </InputControlContainer>
  )
}

