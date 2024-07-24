import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icons } from '@assets/icons';
import { TouchableOpacity } from 'react-native';

import * as S from './styles';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';

interface IHeaderProps {
	title?: string | undefined;
}

export const Header = ({ title }: IHeaderProps) => {
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();

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

					<Text variant="bold" fontSize={24}>
						{title}
					</Text>
				</S.ContainerWithoutAvatar>
			) : (
				<S.ContainerWithAvatar>
					<Icons.Logo />

					<TouchableOpacity onPress={goToProfile}>
						<S.Avatar
							source={require('@assets/images/Profile.png')}
						/>
					</TouchableOpacity>
				</S.ContainerWithAvatar>
			)}
		</S.Container>
	);
};
