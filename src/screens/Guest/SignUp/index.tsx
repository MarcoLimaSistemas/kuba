import React from 'react';
import api from '../../../services/api';

import { useState } from 'react';
import { Alert } from 'react-native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { InputUnMasked } from '@components/InputUnMasked';

import { Container, ContainerButton, Content, InputsContainer } from './styles';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ISignUpCredentials } from '../../../models/signUp';
import { Error } from '../SignIn/styles';

import { SignUpSchema } from '../../../schemas/signup';
import { InputMasked } from '@components/InputMasked';
import Toast from 'react-native-toast-message';
import { Spacer } from '@components/Spacer';

export function SignUp() {
	const navigation = useNavigation();

	const [loading, setLoading] = useState(false);

	const [showPassword, setShowPassword] = useState(true);
	const [showConfirmedPassword, setShowConfirmedPassword] = useState(true);

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ISignUpCredentials>({
		resolver: yupResolver(SignUpSchema)
	});

	const adjustBirthDate = (birthDate: string) => {
		try {
			return birthDate.replace(/\//g, '-').split('-').reverse().join('-');
		} catch (error) {
			return '';
		}
	};

	async function onSubmitSignUp(data: ISignUpCredentials) {
		const payload = {
			user_type: 'USER',
			name: data.name,
			email: data.email,
			birthDate: adjustBirthDate(data.birthDate),
			password: data.passwordConfirmation,
			password_confirm: data.passwordConfirmation
		};

		try {
			console.log(payload);
			const { data } = await api.post('/signup', payload);
			setLoading(true);
			console.log(data.message);
			Toast.show({
				type: 'error',
				text2: data.message
			});
			navigation.navigate('ScreenSuccessful');
		} catch (err: any) {
			console.log(err.response.data.message);
			Alert.alert('Error ao cadastrar', err.response.data.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Container>
			<Header title="Cadastro" />

			<Spacer h={32} />

			<Content showsVerticalScrollIndicator={false}>
				<InputsContainer>
					<InputUnMasked
						control={control}
						label="Nome"
						name="name"
						placeholder="Digite seu nome"
						error={
							errors.name && <Error>{errors.name.message}</Error>
						}
					/>

					<InputUnMasked
						control={control}
						label="E-mail"
						name="email"
						placeholder="Digite seu e-mail"
						keyboardType="email-address"
						error={
							errors.email && (
								<Error>{errors.email.message}</Error>
							)
						}
					/>

					<InputMasked
						type="custom"
						options={{
							mask: '99/99/9999'
						}}
						keyboardType="numeric"
						control={control}
						label="Data de nascimento"
						name="birthDate"
						placeholder="Digite sua data de nascimento"
						error={
							errors.birthDate && (
								<Error>{errors.birthDate.message}</Error>
							)
						}
					/>

					<InputUnMasked
						control={control}
						label="Senha"
						name="password"
						eye={true}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						secureTextEntry={showPassword}
						placeholder="Digite sua senha"
						error={
							errors.password && (
								<Error>{errors.password.message}</Error>
							)
						}
					/>

					<InputUnMasked
						control={control}
						label="Repetir senha"
						name="passwordConfirmation"
						eye={true}
						secureTextEntry={showConfirmedPassword}
						showPassword={showConfirmedPassword}
						setShowPassword={setShowConfirmedPassword}
						placeholder="Confirme sua senha"
						error={
							errors.passwordConfirmation && (
								<Error>
									{errors.passwordConfirmation.message}
								</Error>
							)
						}
					/>
				</InputsContainer>

				<ContainerButton>
					<Button
						title="Enviar"
						variant="primary"
						activeLoad={loading}
						onPress={handleSubmit(onSubmitSignUp)}
					/>

					<Button
						title="Voltar"
						variant="secondary"
						onPress={() => navigation.goBack()}
					/>
				</ContainerButton>
			</Content>
		</Container>
	);
}
