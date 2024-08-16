import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '@assets/icons';
import { TouchableOpacity } from 'react-native';

import * as S from './styles';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { userDetails } from '@react-query/userDetails';

interface IHeaderProps {
	title?: string | undefined;
	typeLogo?: 'black' | 'white';
}

export const Header = ({ title, typeLogo = 'black' }: IHeaderProps) => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

	const { data } = userDetails({
		isEnabled: !title
	});

	const goToProfile = () => {
		navigation.navigate('Profile');
	};

	const goBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
	};

	return (
		<S.Container style={{ marginTop: insets.top }}>
			{Boolean(title) ? (
				<S.ContainerWithoutAvatar>
					<TouchableOpacity onPress={goBack}>
						<Icons.ArrowLeft />
					</TouchableOpacity>

					<Spacer w={16} />

					<Text variant="bold" fontSize={20}>
						{title}
					</Text>
				</S.ContainerWithoutAvatar>
			) : (
				<S.ContainerWithAvatar>
					{typeLogo === 'black' ? (
						<Icons.Logo />
					) : (
						<Icons.LogoWhite />
					)}

					<TouchableOpacity onPress={goToProfile}>
						<S.Avatar
							source={
								data?.client.profile_url
									? { uri: data?.client?.profile_url }
									: require('@assets/images/avatar.png')
							}
						/>
					</TouchableOpacity>
				</S.ContainerWithAvatar>
			)}
		</S.Container>
	);
};
