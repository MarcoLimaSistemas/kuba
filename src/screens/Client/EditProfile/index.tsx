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
import { timestampToDate } from '@utils/date';
import { useEditUser } from '@react-query/mutateEditUser';
import { userDetails } from '@react-query/userDetails';
import { Spacer } from '@components/Spacer';
import { View } from 'react-native';
import Text from '@components/Text';

export type UserInfoFormData = {
	profilePhoto?: string;
	name: string;
	description: string;
	birthDate: string;
	facebook: string;
	instagram: string;
	spotify: string;
	qobuzz: string;
};

export function EditProfile() {
	const navigation = useNavigation();

	const { data: userDetailsData } = userDetails({});

	const { mutateEditUser, isPendingEditUser } = useEditUser();

	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = useForm<UserInfoFormData>({
		resolver: yupResolver(EditProfileSchema),
		defaultValues: { description: '' }
	});

	const onSubmit = async (data: UserInfoFormData) => {
		if (!userDetailsData) return;

		const requestData = {
			name: data.name,
			description: data.description,
			birthDate: data.birthDate.split('/').reverse().join('-'),
			facebook: data.facebook,
			instagram: data.instagram,
			spotify: data.spotify,
			qobuzz: data.qobuzz
		};

		mutateEditUser({
			userId: userDetailsData.id,
			data: requestData
		});
	};

	React.useEffect(() => {
		if (!userDetailsData) return;

		setValue('name', userDetailsData.name);
		setValue('description', userDetailsData.client.description ?? '');

		setValue(
			'birthDate',
			timestampToDate(userDetailsData.client.birth_date)
		);
		setValue(
			'facebook',
			userDetailsData.client.socialNetworks[0]?.link ?? ''
		);
		setValue(
			'instagram',
			userDetailsData.client.socialNetworks[1]?.link ?? ''
		);
		setValue(
			'spotify',
			userDetailsData.client.socialNetworks[2]?.link ?? ''
		);
		setValue(
			'qobuzz',
			userDetailsData.client.socialNetworks[3]?.link ?? ''
		);
	}, [userDetailsData]);

	const descriptionLength = watch('description').length;

	return (
		<Container>
			<Header title="Editar perfil" />
			<Spacer h={32} />
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

				<View>
					<InputUnMasked
						control={control}
						label="Descrição"
						name="description"
						placeholder="Adicionar descrição"
						multiline
						height={128}
					/>
					<Text
						fontSize={12}
						style={{ textAlign: 'right' }}
						color={descriptionLength > 500 ? '#A60000' : '#242424'}>
						{descriptionLength}/500
					</Text>
				</View>

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
