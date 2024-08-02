import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';

import { BoxButtons, Container, InputsContainer, TextError } from './styles';

import { InputUnMasked } from '@components/InputUnMasked';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordSchema } from '../../../schemas/changePassword';
import { Spacer } from '@components/Spacer';
import { View } from 'react-native';
import theme from '../../../styles/theme';

type FormData = {
	currentPassword: string;
	newPassword: string;
	confirmationPassword: string;
};

export function ChangePassword() {
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<FormData>({
		resolver: yupResolver(ChangePasswordSchema)
	});

	const [showPassword, setShowPassword] = useState(true);
	const [showCurrentPassword, setCurrentShowPassword] = useState(true);
	const [showConfirmedPassword, setShowConfirmedPassword] = useState(true);

	const onSubmit = (data: FormData) => {
		console.log(data);
		navigation.navigate('PasswordResetSuccess');
	};
	return (
		<>
			<View style={{ backgroundColor: theme.COLORS.white_100 }}>
				<Header title="Alterar senha" />
			</View>

			<Container>
				<KeyboardAwareScrollView
					contentContainerStyle={{ flexGrow: 1 }}
					showsVerticalScrollIndicator={false}>
					<Spacer h={32} />

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

						<Spacer h={48} />

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

					<View style={{ flex: 1 }} />

					<BoxButtons>
						<Button
							title="Salvar"
							onPress={handleSubmit(onSubmit)}
						/>
						<Button
							title="Cancelar"
							variant="secondary"
							onPress={() => navigation.goBack()}
						/>
					</BoxButtons>
				</KeyboardAwareScrollView>
			</Container>
		</>
	);
}
