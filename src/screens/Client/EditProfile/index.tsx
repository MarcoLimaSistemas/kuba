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
// import { isPendingEditUser, mutateEditUser } from '@react-query/mutateEditUser';

export type UserInfoFormData = {
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

	const { data: userInfo, isLoading } = useGetUserInfo();
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

		mutateEditUser(requestData);
	};

	React.useEffect(() => {
		if (!userInfo) return;

		setValue('name', userInfo.data.user.name);
		setValue('description', userInfo.data.userClient.description ?? '');
		setValue('email', userInfo.data.user.email);
		setValue(
			'birthDate',
			timestampToDate(userInfo.data.userClient.birth_date)
		);
		setValue('facebook', userInfo.data.socialNetworks[0]?.link ?? '');
		setValue('instagram', userInfo.data.socialNetworks[1]?.link ?? '');
		setValue('spotify', userInfo.data.socialNetworks[2]?.link ?? '');
		setValue('qobuzz', userInfo.data.socialNetworks[3]?.link ?? '');
	}, [userInfo]);

	console.log(' isPendingEditUser:', isPendingEditUser);

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
