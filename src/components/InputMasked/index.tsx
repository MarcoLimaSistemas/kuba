import React, { ReactNode } from "react"
import { Image } from "react-native"
import { Controller } from "react-hook-form"
import { TextInputMaskProps } from "react-native-masked-text"
import { InputMask, InputArea, InputGroup, InputLabel, TouchableIcon } from "./styles"

import { Eye, EyeOff } from '@assets/icons'
import theme from "../../styles/theme"

interface InputMaskedProps extends TextInputMaskProps {
  control: any
  label: string
  name: string
  eye?: boolean
  showPassword?: boolean
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>> | any
  error?: ReactNode
}

export function InputMasked({
  control,
  label,
  name,
  eye,
  error,
  showPassword,
  setShowPassword,
  ...props
}: InputMaskedProps) {

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
            <InputMask
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