import React, { useState } from 'react';
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
import { timestampToDate } from '@utils/date';
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
import { userDetails } from '../../../react-query/userDetails';
import { Spacer } from '@components/Spacer';
import { Loading } from '@components/Loading';

export function Profile() {
	const navigation = useNavigation();

	const { logout } = useAuth();

	const { data: user, isLoading } = userDetails({});

	const [isEnabled, setIsEnabled] = useState(false);

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Container>
			<ScrollView showsVerticalScrollIndicator={false}>
				<Header title="Perfil" />
				<Spacer h={32} />
				<ImageProfile source={profile} />
				<Name>{user?.name}</Name>

				<Description>
					{user?.client?.description ?? 'No description'}
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
							{timestampToDate(user?.client?.birth_date ?? '')}
						</Text>
					</Separator>

					<TextBold>Email</TextBold>
					<Text>{user?.email}</Text>
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
