import React, { useEffect, useRef } from 'react';

import { Header } from '@components/Header';
import {
	BoxButtons,
	BoxPhoto,
	Container,
	ContainerIconModal,
	InputsContainer,
	Photo,
	TextError
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
import { TouchableOpacity, View } from 'react-native';
import Text from '@components/Text';
import theme from '../../../styles/theme';
import { Modalize } from 'react-native-modalize';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';

import ImagePicker, { Options } from 'react-native-image-crop-picker';

export type UserInfoFormData = {
	profileImg?: string;
	name: string;
	description: string;
	birthDate: string;
	facebook: string;
	instagram: string;
	spotify: string;
	qobuzz: string;
};

export function EditProfile() {
	const [avatar, setAvatar] = React.useState<any>(null);
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
		defaultValues: {
			name: userDetailsData?.name ?? '',
			description: userDetailsData?.client.description ?? '',
			birthDate: userDetailsData?.client.birth_date
				? timestampToDate(userDetailsData.client.birth_date)
				: '',
			facebook: userDetailsData?.client.socialNetworks[0]?.link ?? '',
			instagram: userDetailsData?.client.socialNetworks[1]?.link ?? '',
			qobuzz: userDetailsData?.client.socialNetworks[2]?.link ?? '',
			spotify: userDetailsData?.client.socialNetworks[3]?.link ?? ''
		}
	});

	const modalizeRef = useRef<Modalize>(null);

	const onOpen = () => {
		modalizeRef.current?.open();
	};

	const onSubmit = async (data: UserInfoFormData) => {
		if (!userDetailsData) return;

		const formData = new FormData();

		formData.append('name', data.name);
		formData.append('description', data.description);
		formData.append(
			'birthDate',
			data.birthDate.split('/').reverse().join('-')
		);
		formData.append('facebook', data.facebook);
		formData.append('instagram', data.instagram);
		formData.append('spotify', data.spotify);
		formData.append('qobuzz', data.qobuzz);

		if (avatar) {
			formData.append('profileImg', {
				uri: avatar.path,
				type: avatar.mime,
				name: avatar.path.split('/').pop()
			} as any);
		}

		mutateEditUser({
			userId: userDetailsData.id,
			data: formData
		});
	};

	const descriptionLength = watch('description').length;

	const onButtonPress = React.useCallback(
		async (type: string, options: Options) => {
			if (type === 'capture') {
				const res = await ImagePicker.openCamera(options);
				setAvatar(res);
			} else {
				const res = await ImagePicker.openPicker(options);
				setAvatar(res);
			}
		},
		[]
	);

	const getProfilePicture = () => {
		if (avatar) {
			return avatar.path;
		}
		if (userDetailsData?.client.profile_url) {
			return userDetailsData?.client.profile_url;
		}

		return null;
	};

	useEffect(() => {
		if (modalizeRef.current) {
			modalizeRef.current?.close();
		}
	}, [avatar]);

	return (
		<>
			<View style={{ backgroundColor: theme.COLORS.white_100 }}>
				<Header title="Editar perfil" />
				<Spacer h={32} />
			</View>
			<Container>
				<BoxPhoto>
					<Photo
						source={
							getProfilePicture()
								? { uri: getProfilePicture() }
								: require('@assets/images/avatar.png')
						}
					/>
					<Spacer w={16} />

					<TouchableOpacity onPress={onOpen}>
						<Text
							style={{
								textDecorationLine: 'underline'
							}}>
							Alterar foto de perfil
						</Text>
					</TouchableOpacity>
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
							color={
								descriptionLength > 500 ? '#A60000' : '#242424'
							}>
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
								<TextError>
									{errors.birthDate.message}
								</TextError>
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
								<TextError>
									{errors.instagram.message}
								</TextError>
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

			<Modalize
				ref={modalizeRef}
				withHandle={false}
				adjustToContentHeight>
				<View
					style={{
						flexDirection: 'row',
						padding: scale(16),
						paddingTop: scale(32),
						justifyContent: 'space-around'
					}}>
					<ContainerIconModal
						onPress={() =>
							onButtonPress('capture', {
								width: 300,
								height: 400,
								cropping: true,
								hideBottomControls: true,
								cropperCircleOverlay: true
							})
						}>
						<Icons.Camera width={scale(48)} height={scale(48)} />
						<Text variant="bold">Câmera</Text>
					</ContainerIconModal>
					<ContainerIconModal
						onPress={() =>
							onButtonPress('library', {
								width: 300,
								height: 400,
								cropping: true,
								hideBottomControls: true,
								cropperCircleOverlay: true
							})
						}>
						<Icons.Gallery width={scale(48)} height={scale(48)} />
						<Text variant="bold">Galeria</Text>
					</ContainerIconModal>
				</View>
			</Modalize>
		</>
	);
}
