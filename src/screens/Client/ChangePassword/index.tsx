import React, {useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigation} from '@react-navigation/native'

import {Button} from '@components/Button'
import {Header} from '@components/Header'

import {BoxButtons, Container, InputsContainer, TextError} from './styles'

import {InputUnMasked} from '@components/InputUnMasked'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {yupResolver} from '@hookform/resolvers/yup'
import {ChangePasswordSchema} from '../../../schemas/changePassword'

type FormData = {
    currentPassword: string
    newPassword: string
    confirmationPassword: string
}

export function ChangePassword() {
    const navigation = useNavigation()
    const {
        control,
        handleSubmit,
        formState: {errors}
    } = useForm<FormData>({
        resolver: yupResolver(ChangePasswordSchema)
    })

    const [showPassword, setShowPassword] = useState(true)
    const [showCurrentPassword, setCurrentShowPassword] = useState(true)
    const [showConfirmedPassword, setShowConfirmedPassword] = useState(true)

    const onSubmit = (data: FormData) => {
        console.log(data)
        navigation.navigate('PasswordResetSuccess')
    }
    return (
        <Container>
            <KeyboardAwareScrollView>
                <Header title="Alterar senha" activeButtonGoBack={true} />

                <InputsContainer>
                    <InputUnMasked
                        control={control}
                        label="Senha atual"
                        name="currentPassword"
                        eye={true}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                        secureTextEntry={showPassword}
                        placeholder="Digite sua senha"
                        error={
                            errors.newPassword && (
                                <TextError>
                                    {errors.newPassword.message}
                                </TextError>
                            )
                        }
                    />

                    <InputUnMasked
                        control={control}
                        label="Nova senha"
                        name="newPassword"
                        eye={true}
                        showPassword={showCurrentPassword}
                        setShowPassword={setCurrentShowPassword}
                        secureTextEntry={showCurrentPassword}
                        placeholder="Digite sua senha"
                        error={
                            errors.newPassword && (
                                <TextError>
                                    {errors.newPassword.message}
                                </TextError>
                            )
                        }
                    />

                    <InputUnMasked
                        control={control}
                        label="Repetir nova senha"
                        name="confirmationPassword"
                        eye={true}
                        secureTextEntry={showConfirmedPassword}
                        showPassword={showConfirmedPassword}
                        setShowPassword={setShowConfirmedPassword}
                        placeholder="Confirme sua senha"
                        error={
                            errors.confirmationPassword && (
                                <TextError>
                                    {errors.confirmationPassword.message}
                                </TextError>
                            )
                        }
                    />
                </InputsContainer>

                <BoxButtons>
                    <Button title="Salvar" onPress={handleSubmit(onSubmit)} />
                    <Button
                        title="Cancelar"
                        variant="secondary"
                        onPress={() => navigation.goBack()}
                    />
                </BoxButtons>
            </KeyboardAwareScrollView>
        </Container>
    )
}
