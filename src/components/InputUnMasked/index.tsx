import React, { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { TextInputProps, Image } from "react-native";
import { Input, InputArea, InputGroup, InputLabel, TouchableIcon } from "./styles";

import { Eye, EyeOff } from '@assets/icons'
import theme from "../../styles/theme";

interface InputUnMaskedProps extends TextInputProps {
  control: any;
  label: string;
  name: string;
  eye?: boolean;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>> | any;
  error?: ReactNode;
}

export function InputUnMasked({
  control,
  label,
  name,
  eye,
  error,
  showPassword,
  setShowPassword,
  ...props
}: InputUnMaskedProps) {

  return (
    <InputGroup>
      <InputLabel>{label}</InputLabel>
      <Controller
        control={control}
        name={name}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <InputArea>
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder='Digite seu nome'
              placeholderTextColor={theme.COLORS.black}
              {...props}
            />
            {eye &&
              <TouchableIcon
                onPress={() => setShowPassword(!showPassword)}
              >
                {showPassword ?
                  <Image source={EyeOff} /> :
                  <Image source={Eye} />}
              </TouchableIcon>
            }
          </InputArea>
        )}
      />
      {error}
    </InputGroup>
  )
}