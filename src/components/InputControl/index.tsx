import React from "react"

import { Control, Controller, FieldErrorsImpl } from "react-hook-form";
import { InputMasked, InputUnMasked, InputControlContainer, Label, TextSizes } from "./styles"
import { TextInputMaskProps } from "react-native-masked-text";
import { Image, Text } from "react-native";

interface InputControlProps extends TextInputMaskProps {
  isMasked?: boolean;
  label: string;
  name: string;
  masked?: string;
  control: Control<FormData | any>;
  rule?: boolean;
  typePassword?: boolean;
  openPassword?: boolean;
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
      {multiline && <TextSizes>max {props.maxLength} caracteres</TextSizes>}
    </InputControlContainer>
  )
}

