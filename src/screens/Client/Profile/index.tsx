import React, { useEffect, useState } from 'react';
import { ScrollView, Switch } from 'react-native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';

import { profile } from '@assets/images';
import {
	FacebookLogo,
	InstagramLogo,
	QobuzzLogo,
	SpotifyLogo
} from '@assets/sociais';

import { useAuth } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { useGetUserInfo } from '@react-query/getUserInfo';
import { timestampToDate } from '@utils/date';
import api from '../../../services/api';
import {
	BoxButtons,
	BoxText,
	Container,
	ContainerSocial,
	ContainerSwitch,
	Description,
	ImageProfile,
	LogoSocial,
	Name,
	Separator,
	Text,
	TextBold,
	TextSwitch
} from './styles';

export function Profile() {
	const navigation = useNavigation();

	const { logout } = useAuth();

	const { data: userInfo } = useGetUserInfo();

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	async function onProductKuba() {
		try {
			const res = await api.get('/user/perfil/update/product/kuba', {
				params: {
					kuba_product: isEnabled
				}
			});

			console.log(res.data);
		} catch (err) {
			console.log(err);
		} finally {
		}
	}

	useEffect(() => {
		// onProductKuba();
	}, [isEnabled]);

	if (!userInfo) return;

	return (
		<Container>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header title="Perfil" activeButtonGoBack={true} />
				<ImageProfile source={profile} />
				<Name>{userInfo.user?.name}</Name>

				<Description>
					{userInfo?.userClient?.description ?? '---'}
				</Description>

				<ContainerSwitch>
					<Switch
						trackColor={{ false: '#656565', true: '#D4BD85' }}
						thumbColor={isEnabled ? '#656565' : '#f4f3f4'}
						ios_backgroundColor="#3e3e3e"
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
					<TextSwitch>
						{isEnabled ? 'Tenho' : 'Não tenho'} um produto Kuba
					</TextSwitch>
				</ContainerSwitch>

				<ContainerSocial>
					<LogoSocial source={FacebookLogo} />
					<LogoSocial source={InstagramLogo} />
					<LogoSocial source={SpotifyLogo} />
					<LogoSocial source={QobuzzLogo} />
				</ContainerSocial>

				<BoxText>
					<Separator>
						<TextBold>Data de nascimento</TextBold>
						<Text>
							{timestampToDate(userInfo.userClient.birth_date)}
						</Text>
					</Separator>

					<TextBold>Email</TextBold>
					<Text>{userInfo.user.email}</Text>
				</BoxText>

				<BoxButtons>
					<Button title="Sair" onPress={logout} />
					<Button
						title="Editar Perfil"
						onPress={() => navigation.navigate('EditProfile')}
					/>
					<Button
						title="Alterar Senha"
						variant="secondary"
						onPress={() => navigation.navigate('ChangePassword')}
					/>
				</BoxButtons>
			</ScrollView>
		</Container>
	);
}
