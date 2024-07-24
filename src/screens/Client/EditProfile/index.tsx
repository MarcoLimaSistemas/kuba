import React from 'react';

import { Header } from '@components/Header';
import {
	BoxButtons,
	BoxPhoto,
	Container,
	InputsContainer,
	Photo,
	TextError,
	TextPhoto
} from './styles';

import { profile } from '@assets/images';
import { Button } from '@components/Button';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { InputUnMasked } from '@components/InputUnMasked';
import { InputMasked } from '@components/InputMasked';
import { yupResolver } from '@hookform/resolvers/yup';
import { EditProfileSchema } from '../../../schemas/editProfile';
import User from '@services/user';
import { dateToTimestamp, timestampToDate } from '@utils/date';
import { useEditUser } from '@react-query/mutateEditUser';
import { useGetUserInfo } from '@react-query/getUserInfo';
import { useAuth } from '@hooks/auth';

export type UserInfoFormData = {
	profilePhoto?: string;
	name: string;
	description: string;
	email: string;
	birthDate: string;
	facebook: string;
	instagram: string;
	spotify: string;
	qobuzz: string;
};

export function EditProfile() {
	const navigation = useNavigation();
	const { user } = useAuth();
	const { data: userInfo } = useGetUserInfo(user.id);

	const { mutateEditUser, isPendingEditUser } = useEditUser();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue
	} = useForm<UserInfoFormData>({
		resolver: yupResolver(EditProfileSchema)
	});

	const onSubmit = async (data: UserInfoFormData) => {
		if (!userInfo) return;

		const requestData = {
			name: data.name,
			description: data.description,
			email: data.email,
			birthDate: dateToTimestamp(data.birthDate),
			facebook: data.facebook,
			instagram: data.instagram,
			spotify: data.spotify,
			qobuzz: data.qobuzz
		};

		mutateEditUser({
			userId: userInfo.id,
			data: requestData
		});
	};

	React.useEffect(() => {
		if (!userInfo) return;

		setValue('name', userInfo.name);
		setValue('description', userInfo.client.description ?? '');
		setValue('email', userInfo.email);
		setValue('birthDate', timestampToDate(userInfo.client.birth_date));
		setValue('facebook', userInfo.client.socialNetworks[0]?.link ?? '');
		setValue('instagram', userInfo.client.socialNetworks[1]?.link ?? '');
		setValue('spotify', userInfo.client.socialNetworks[2]?.link ?? '');
		setValue('qobuzz', userInfo.client.socialNetworks[3]?.link ?? '');
	}, [userInfo]);

	return (
		<Container>
			<Header title="Editar perfil" activeButtonGoBack={true} />
			<BoxPhoto>
				<Photo source={profile} />
				<TextPhoto>Alterar foto de perfil</TextPhoto>
			</BoxPhoto>

			<InputsContainer>
				<InputUnMasked
					control={control}
					label="Nome"
					name="name"
					placeholder="Digite seu nome"
					error={
						errors.name && (
							<TextError>{errors.name.message}</TextError>
						)
					}
				/>

				<InputUnMasked
					control={control}
					label="Descrição"
					name="description"
					placeholder="Digite sua Descrição"
					multiline={true}
					numberOfLines={4}
					textAlignVertical="top"
					error={
						errors.description && (
							<TextError>{errors.description.message}</TextError>
						)
					}
				/>

				{/* <InputUnMasked
					control={control}
					label="E-mail"
					name="email"
					placeholder="Digite seu e-mail"
					keyboardType="email-address"
					error={
						errors.email && (
							<TextError>{errors.email.message}</TextError>
						)
					}
					editable={false}
				/> */}

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
							<TextError>{errors.birthDate.message}</TextError>
						)
					}
				/>

				<InputUnMasked
					control={control}
					label="Facebook"
					name="facebook"
					placeholder="Digite seu facebook"
					error={
						errors.facebook && (
							<TextError>{errors.facebook.message}</TextError>
						)
					}
				/>

				<InputUnMasked
					control={control}
					label="Instagram"
					name="instagram"
					placeholder="Digite seu instagram"
					error={
						errors.instagram && (
							<TextError>{errors.instagram.message}</TextError>
						)
					}
				/>

				<InputUnMasked
					control={control}
					label="Spotify"
					name="spotify"
					placeholder="Digite seu spotify"
					error={
						errors.spotify && (
							<TextError>{errors.spotify.message}</TextError>
						)
					}
				/>

				<InputUnMasked
					control={control}
					label="Qobuzz"
					name="qobuzz"
					placeholder="Digite seu qobuzz"
					error={
						errors.qobuzz && (
							<TextError>{errors.qobuzz.message}</TextError>
						)
					}
				/>

				<BoxButtons>
					<Button
						title="Enviar"
						activeLoad={isPendingEditUser}
						onPress={handleSubmit(onSubmit)}
					/>
					<Button
						title="Voltar"
						variant="secondary"
						onPress={() => navigation.goBack()}
					/>
				</BoxButtons>
			</InputsContainer>
		</Container>
	);
}
