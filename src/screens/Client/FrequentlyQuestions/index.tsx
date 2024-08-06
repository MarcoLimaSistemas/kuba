import * as React from 'react';

import { Container } from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';
import { Dropdown } from '@components/DropDown';
import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Spacer } from '@components/Spacer';
import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getCommonQuestions } from '@services/zohoDesk';
import { useAuth } from '@hooks/auth';
import { Loading } from '@components/Loading';
import Text from '@components/Text';

export function FrequentlyQuestions() {
	const navigation = useNavigation();
	const { user } = useAuth();

	const route = useRoute();

	const { deviceId } = route.params as any;

	const { data, isLoading } = useQuery({
		queryKey: ['CommonQuestions'],
		queryFn: () => getCommonQuestions(user?.id, deviceId)
	});

	return (
		<>
			<View style={{ backgroundColor: '#FFF' }}>
				<Header title="Dúvidas frequentes" />
				<Spacer h={16} />
			</View>

			<Container contentContainerStyle={{ flexGrow: 1 }}>
				<Spacer h={16} />

				<FlatList
					showsVerticalScrollIndicator={false}
					data={data?.data ?? []}
					ItemSeparatorComponent={() => <Spacer h={16} />}
					renderItem={({ item }) => (
						<Dropdown
							key={item.id}
							title={item.question}
							text={item.reply}
						/>
					)}
					ListEmptyComponent={() =>
						isLoading ? (
							<Loading />
						) : (
							<Text fontSize={14} color="#777777">
								Nenhum dúvida registrada! :(
							</Text>
						)
					}
				/>

				<View style={{ flex: 1 }} />

				<Spacer h={16} />

				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</Container>
		</>
	);
}
