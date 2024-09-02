import React from 'react';
import { FlatList, Image, View, Linking } from 'react-native';
import {
	NavigationProp,
	useNavigation,
	useRoute
} from '@react-navigation/native';

import { Button } from '@components/Button';
import { Link } from '@assets/images';
import Text from '@components/Text';

import {
	CardTutorial,
	CardTutorialText,
	Container,
	ContainerImage,
	Icon,
	Wrapper
} from './styles';
import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '@services/product';
import { useAuth } from '@hooks/auth';
import { Header } from '@components/Header';
import { Spacer } from '@components/Spacer';
import { Loading } from '@components/Loading';
import Toast from 'react-native-toast-message';

export function Tutorials() {
	const navigation = useNavigation() as
		| NavigationProp<ReactNavigation.RootParamList>
		| any;

	const { user } = useAuth();

	const route = useRoute();

	const { deviceId } = route.params as any;

	const { data, isLoading } = useQuery({
		queryKey: ['DeviceDetails'],
		queryFn: () => getProductDetails(user?.id, deviceId)
	});

	const handlePress = async (link: string) => {
		try {
			await Linking.openURL(link);
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Erro ao abrir o vídeo! :('
			});
		}
	};

	const tutorials = data?.tutorialVideos ?? [];

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Wrapper
		contentContainerStyle={{
			flexGrow: 1
		}}
		showsVerticalScrollIndicator={false}
		>
			<Header />

			<Container>
				<Text
					variant="bold"
					color="#656565"
					style={{
						textAlign: 'center',
						letterSpacing: 8
					}}>
					{data?.name}
				</Text>

				<Spacer h={16} />

				<Text
					fontSize={12}
					variant="lightItalic"
					style={{ textAlign: 'center' }}>
					{
						'Para aprender a usar seu Kuba Disco, basta\n clicar nos pontos de seleção da imagem'
					}
				</Text>

				<Spacer h={16} />

				<ContainerImage>
					<Image
						style={{
							width: '90%',
							height: '90%'
						}}
						resizeMode="contain"
						source={{
							uri: data?.img_url
						}}
					/>
				</ContainerImage>

				<Text variant="bold" color="#656565">
					Tutoriais
				</Text>

				<Spacer h={16} />

				{tutorials.length === 0 ? (
					<Text fontSize={14} color="#8b8a8a">
						No momento não temos nenhum video!
					</Text>
				) : (
					<FlatList
						scrollEnabled={false}
						data={tutorials}
						ItemSeparatorComponent={() => <Spacer h={16} />}
						renderItem={({ item }) => (
							<CardTutorial key={item.id}>
								<CardTutorialText>
									<Text
										color="#656565"
										fontSize={14}
										numberOfLines={2}>
										{item.name}
									</Text>
								</CardTutorialText>

								<Icon onPress={() => handlePress(item.link)}>
									<Image source={Link} />
								</Icon>
							</CardTutorial>
						)}
					/>
				)}

				<Spacer h={16} />

				<View style={{ flex: 1 }} />

				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</Container>
		</Wrapper>
	);
}
