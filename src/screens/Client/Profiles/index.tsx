import React, { useMemo } from 'react';
import { Search } from '@components/Search';
import { useState } from 'react';

import { Container, Wrapper } from './styles';
import Text from '@components/Text';
import { Header } from '@components/Header';

import { Button } from '@components/Button';

import {
	View,
	Dimensions,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';

import theme from '../../../styles/theme';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getPresetsPublics } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { Loading } from '@components/Loading';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const paddingHorizontal = scale(16);
const margin = scale(8);
const numColumns = 3;

const getRandomSpan = () => {
	const spans = [1, 2, 3];
	return spans[Math.floor(Math.random() * spans.length)];
};

const getGridLayout = (data: any[]) => {
	const navigation = useNavigation();

	let grid = [];
	let currentRow: any[] = [];
	let columnCount = 0;
	const itemContainerWidth = width - paddingHorizontal * 2 - margin * 2;

	data.forEach(item => {
		let span = getRandomSpan();

		if (columnCount + span > numColumns) {
			span = numColumns - columnCount;
		}

		const itemWidth =
			(itemContainerWidth / numColumns) * span + margin * (span - 1);
		const itemHeight = scale(120);
console.log('currentRow',currentRow);
		currentRow.push(
			<TouchableOpacity
				key={item?.id}
				style={{
					borderRadius: scale(8),
					width: itemWidth,
					height: itemHeight,
					marginRight: margin,
					marginBottom: margin,
				}}
				onPress={()=>
				 	navigation.navigate('ProfileView',{
				 	userId:item?.client?.id,
				 })
			}
				>
				<Image
					source={
						item?.client.profile_url
							? { uri: item?.client?.profile_url }
							: require('@assets/images/avatar.png')
					}
					resizeMode="cover"
					style={{
						width: '100%',
						height: '100%',
						borderRadius: scale(8),
					}}
				/>
			</TouchableOpacity>
		);
		columnCount += span;

		if (columnCount >= numColumns) {
			grid.push(
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}
					key={`row-${grid.length}`}>
					{currentRow}
				</View>
			);
			currentRow = [];
			columnCount = 0;
		}
	});

	if (currentRow.length > 0) {
		grid.push(
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
				key={`row-${grid.length}`}>
				{currentRow}
			</View>
		);
	}

	return grid;
};

export function Profiles() {
	const navigation = useNavigation();

	const [search, setSearch] = useState('');

	const { user } = useAuth();

	const { data, isLoading, refetch, hasNextPage, fetchNextPage } =
		useInfiniteQuery({
			queryKey: ['PresetsPublics'],
			queryFn: ({ pageParam }) =>
				getPresetsPublics(user?.id, search, pageParam),
			initialPageParam: 1,
			getNextPageParam: lastPage => lastPage.meta.next_page_url,
		});

	const handleNextPage = () => {
		if (hasNextPage) {
			return fetchNextPage();
		}
	};

	const profiles = useMemo(() => {
		return data?.pages.flatMap(page => page.data) ?? [];
	}, [data]);

	return (
		<Wrapper>
			<View style={{ backgroundColor: theme.COLORS.white_100 }}>
				<Header />
			</View>

			<Container>
				<Spacer h={16} />
				<Text
					color="#656565"
					variant="bold"
					style={{
						textAlign: 'center',
						letterSpacing: scale(8),
					}}>
					PÚBLICOS
				</Text>
				<Spacer h={16} />
				<Search
					searchCallback={() => {
						refetch();
					}}
					onChangeText={text => setSearch(text)}
					loading={false}
					placeholder="Procurar perfil"
					placeholderTextColor={'#A0A0A0'}
					style={{ borderColor: '#242424' }}
					typeButton="black"
				/>

				<Spacer h={16} />

				<ScrollView
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: paddingHorizontal,
						flexGrow: 1,
					}}>
					{isLoading && <Loading />}
					{getGridLayout(profiles)}

					<Spacer h={16} />

					<View style={{ flex: 1 }} />

					<Button
						title={'CARREGAR MAIS'}
						variant="secondary"
						onPress={handleNextPage}
					/>
					<Button
						title={'Voltar'}
						onPress={() => navigation.goBack()}
					/>
				</ScrollView>
			</Container>
		</Wrapper>
	);
}
