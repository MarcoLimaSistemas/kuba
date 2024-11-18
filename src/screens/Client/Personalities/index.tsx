import React, { useMemo } from 'react';
import { Button } from '@components/Button';
import { Search } from '@components/Search';
import { useState } from 'react';

import { Container } from './styles';
import Text from '@components/Text';
import { Header } from '@components/Header';
import { FlatList, StatusBar, View } from 'react-native';
import theme from '../../../styles/theme';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { CardPersonality } from '@components/CardProfile/CardPersonality';
import { useNavigation } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPresets } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { Loading } from '@components/Loading';

export function Personalities() {
	const navigation = useNavigation<any>();

	const { user } = useAuth();

	const [search, setSearch] = useState('');

	const { data, isLoading, refetch } = useInfiniteQuery({
		queryKey: ['Personalities'],
		queryFn: ({ pageParam }) => getPresets(user?.id, search, pageParam),
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    }
	});

	const handleSearch = () => {
		refetch();
	};

	const personalities = useMemo(() => {
		return data?.pages.flatMap(page => page.data) ?? [];
	}, [data]);

	const handleOpenPreset = (id:number, name:string, imgURL:string)=>{
		navigation.navigate('Preset', {
			preset: {
				id,
				name,
				imgURL
			}
		})
	}

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
					Personalidades
				</Text>
				<Spacer h={16} />
				<Search
					searchCallback={handleSearch}
					value={search}
					onChangeText={text => setSearch(text)}
					loading={false}
					placeholder="Procurar personalidades"
				/>

				<FlatList
					contentContainerStyle={{ paddingHorizontal: scale(16) }}
					data={personalities}
					renderItem={({ item }) => (
						<CardPersonality
							key={item.id}
							imgURL={item.img_url}
							name={item.name}
							onPress={()=> handleOpenPreset(item.id,item.name, item.img_url)}
						/>
					)}
					ListEmptyComponent={() =>
						isLoading ? (
							<Loading />
						) : (
							<Text color="#FFF" fontSize={14}>
								Nenhuma personalidade encontrada!
							</Text>
						)
					}
					ItemSeparatorComponent={() => <Spacer h={16} />}
					ListFooterComponent={() => (
						<Button
							title={'Voltar'}
							variant="secondary"
							onPress={() => navigation.goBack()}
						/>
					)}
					ListFooterComponentStyle={{
						marginTop: scale(32)
					}}
				/>
			</Container>
		</>
	);
}
