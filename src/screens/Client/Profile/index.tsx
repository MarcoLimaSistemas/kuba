import React, { useState } from 'react';
import { ScrollView, Switch, View } from 'react-native';

import { Button } from '@components/Button';
import { Header } from '@components/Header';

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
	Container,
	ContainerSocial,
	ContainerSwitch,
	ImageProfile,
	LogoSocial
} from './styles';
import { userDetails } from '../../../react-query/userDetails';
import { Spacer } from '@components/Spacer';
import { Loading } from '@components/Loading';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';

export function Profile() {
	const [isEnabled, setIsEnabled] = useState(false);
	const navigation = useNavigation();

	const { logout } = useAuth();

	const { data: user, isLoading } = userDetails({});
	console.log('🚀 ~ Profile ~ user:', user);

	const socialNetworks = user?.client.socialNetworks ?? [];
	console.log('🚀 ~ Profile ~ socialNetworks:', socialNetworks);

	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<>
			<Header title="Perfil" />
			<Spacer h={16} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ flexGrow: 1 }}>
				<Spacer h={16} />
				<ImageProfile
					source={
						user?.client.profile_url
							? { uri: user.client.profile_url }
							: require('@assets/images/avatar.png')
					}
				/>

				<Spacer h={16} />
				<Container>
					<Text
						fontSize={24}
						variant="bold"
						style={{ textAlign: 'center' }}>
						{user?.name}
					</Text>

					<Spacer h={16} />

					<Text>{user?.client?.description ?? 'Sem descrição.'}</Text>

					<Spacer h={16} />

					<ContainerSwitch>
						<Switch
							trackColor={{ false: '#656565', true: '#D4BD85' }}
							thumbColor={isEnabled ? '#656565' : '#f4f3f4'}
							ios_backgroundColor="#3e3e3e"
							onValueChange={toggleSwitch}
							value={isEnabled}
						/>
						<Spacer w={8} />
						<Text>
							{isEnabled ? 'Tenho' : 'Não tenho'} um produto Kuba
						</Text>
					</ContainerSwitch>

					<Spacer h={32} />

					<ContainerSocial>
						{socialNetworks.map(e => {
							const name = e.name;
							switch (name) {
								case 'Facebook':
									return <LogoSocial source={FacebookLogo} />;
								case 'Instagram':
									return (
										<>
											<Spacer w={16} />
											<LogoSocial
												source={InstagramLogo}
											/>
										</>
									);
								case 'Spotify':
									return (
										<>
											<Spacer w={16} />
											<LogoSocial source={SpotifyLogo} />
										</>
									);
								case 'Qobuzz':
									return (
										<>
											<Spacer w={16} />
											<LogoSocial source={QobuzzLogo} />
										</>
									);

								default:
									return null;
							}
						})}
					</ContainerSocial>

					<Spacer h={32} />

					<Text style={{ lineHeight: scale(24) }}>
						<Text variant="bold">Data de nascimento</Text>
						<Text>
							{'\n' +
								timestampToDate(user?.client?.birth_date ?? '')}
						</Text>
					</Text>

					<Spacer h={16} />
					<Text style={{ lineHeight: scale(24) }}>
						<Text variant="bold">Email</Text>
						<Text>{'\n' + user?.email}</Text>
					</Text>
					<Spacer h={32} />
				</Container>

				<View style={{ flex: 1 }} />

				<Container>
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
				</Container>
			</ScrollView>
		</>
	);
}
