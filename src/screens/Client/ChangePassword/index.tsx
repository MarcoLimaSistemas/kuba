import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';

import { BoxButtons, Container, InputsContainer, TextError, Wrapper } from './styles';

import { InputUnMasked } from '@components/InputUnMasked';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { yupResolver } from '@hookform/resolvers/yup';
import { ChangePasswordSchema } from '../../../schemas/changePassword';
import { Spacer } from '@components/Spacer';
import { View } from 'react-native';
import User, { IEditInfoPasswordProps } from '@services/user';
import Auth from '@services/auth';
import { string } from 'yup';
import { useAuth } from '@hooks/auth';
import { userDetails } from '@react-query/userDetails';
import Toast from 'react-native-toast-message';


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
  const {data: user, isLoading} = userDetails({});

	const [showPassword, setShowPassword] = useState(true);
	const [showCurrentPassword, setCurrentShowPassword] = useState(true);
	const [showConfirmedPassword, setShowConfirmedPassword] = useState(true);

	//add react query
	const onSubmit = async (data: FormData) => {	
		try {
			const formatted ={
				userId:user?.id as number,
				data:{
					password:data.newPassword
				}
			}

			const  formattedSignIn={
				email:user?.email as string,
				password:data.currentPassword
			}
			const { data: infoUser } = await Auth.signIn(formattedSignIn)

			if(infoUser.token){
				await User.editPassword(formatted)
				Toast.show({ 
					type: 'success', text1: 'Senha editada com sucesso!',
				});
				navigation.navigate('PasswordResetSuccess');
			}
		
		}catch(err:any){
			console.error(err.response.data.message)
			Toast.show({ 
				type: 'error', text1: 'Erro ao redefinir senha!',
				text2:`${err.response.data.message}`
			});
		}
		
	};
	return (
		<Wrapper>
			<Header title="Alterar senha" />
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
		</Wrapper>
	);
}
