import React from 'react';
import { Button } from '@components/Button';
import { Search } from '@components/Search';
import { ReactNode, useState } from 'react';

import { Container } from './styles';
import Text from '@components/Text';
import { Header } from '@components/Header';
import { FlatList, StatusBar, View } from 'react-native';
import theme from '../../../styles/theme';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { CardPersonality } from '@components/CardProfile/CardPersonality';

interface PersonalitiesProps {
	children: ReactNode;
}

export function Personalities() {
	const [search, setSearch] = useState('');

	return (
		<>
			<StatusBar barStyle={'light-content'} />
			<View style={{ backgroundColor: theme.COLORS.black }}>
				<Header typeLogo="white" />
			</View>

			<Container>
				<Spacer h={16} />
				<Text
					color="#FFF"
					variant="bold"
					style={{
						textTransform: 'uppercase',
						textAlign: 'center',
						letterSpacing: scale(8)
					}}>
					Personaliades
				</Text>
				<Spacer h={16} />
				<Search
					searchCallback={() => {}}
					search={setSearch}
					loading={false}
					placeholder="Procurar personalidades"
				/>

				<FlatList
					contentContainerStyle={{ paddingHorizontal: scale(16) }}
					data={Array.from({ length: 5 }).map((_, i) => i)}
					renderItem={({ item }) => <CardPersonality key={item} />}
					ItemSeparatorComponent={() => <Spacer h={16} />}
					ListFooterComponent={() => (
						<Button title={'Voltar'} variant="secondary" />
					)}
					ListFooterComponentStyle={{
						marginTop: scale(32)
					}}
				/>
			</Container>
		</>
	);
}
