import React from 'react';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { Image } from 'react-native';

import { Button } from '@components/Button';

import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/auth';

import { ISignInCredentials } from '../../../models/auth';

import { logo } from '../../../assets/images';

import {
	Container,
	ContainerButton,
	ContainerLogo,
	ForgotPasswordButton,
	InputsContainer,
	Content,
	Error,
	ForgotPasswordText,
	ForgotPasswordContainer
} from './styles';

import { SignInSchema } from '../../../schemas/auth';
import { InputUnMasked } from '@components/InputUnMasked';
import Text from '@components/Text';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';

export function SignIn() {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const [showPassword, setShowPassword] = useState(true);

	const { signIn } = useAuth();

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ISignInCredentials>({
		resolver: yupResolver(SignInSchema)
	});

	async function handleLogin(data: ISignInCredentials) {
		try {
			setLoading(true);
			await signIn(data);
		} catch (err: any) {
			if (err instanceof AxiosError) {
				if (err.response?.status < 500) {
					Toast.show({
						type: 'error',
						text1: 'Email ou senha inválidos!'
					});
				}
				return;
			}
			Toast.show({
				type: 'error',
				text1: 'Erro no servidor interno!'
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<Container>
			<ContainerLogo>
				<Image source={logo} />
			</ContainerLogo>

			<InputsContainer>
				<InputUnMasked
					control={control}
					label="E-mail"
					name="email"
					placeholder="Digite seu e-mail"
					keyboardType="email-address"
					error={
						errors?.email && <Error>{errors?.email.message}</Error>
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
						errors?.password && (
							<Error>{errors?.password.message}</Error>
						)
					}
				/>

				<ForgotPasswordContainer>
					<ForgotPasswordButton
						onPress={() => navigation.navigate('ForgotPassword')}>
						<Text style={{ textDecorationLine: 'underline' }}>
							Esqueceu a senha?
						</Text>
					</ForgotPasswordButton>
				</ForgotPasswordContainer>
			</InputsContainer>

			<ContainerButton>
				<Button
					title="Entrar"
					variant="primary"
					activeLoad={loading}
					onPress={handleSubmit(handleLogin)}
				/>

				<Button
					title="CADASTRE-SE"
					variant="secondary"
					onPress={() => navigation.navigate('SignUp')}
				/>
			</ContainerButton>
		</Container>
	);
}
