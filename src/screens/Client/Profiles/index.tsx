import React from 'react';
import { Search } from '@components/Search';
import { useState } from 'react';

import { Container } from './styles';
import Text from '@components/Text';
import { Header } from '@components/Header';

import { Button } from '@components/Button';

import {
	StatusBar,
	View,
	Dimensions,
	ScrollView,
	Image,
	TouchableOpacity
} from 'react-native';

import theme from '../../../styles/theme';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';

const { width } = Dimensions.get('window');
const paddingHorizontal = scale(16);
const margin = scale(8);
const numColumns = 3;
const data = Array.from({ length: 10 }).map((_, i) => i); // Dados de exemplo

const getRandomSpan = () => {
	const spans = [1, 2, 3];
	return spans[Math.floor(Math.random() * spans.length)];
};

const getGridLayout = (data: number[]) => {
	let grid = [];
	let currentRow: any[] = [];
	let columnCount = 0;
	const itemContainerWidth = width - paddingHorizontal * 2 - margin * 2;

	data.forEach((item, index) => {
		let span = getRandomSpan();

		if (columnCount + span > numColumns) {
			span = numColumns - columnCount;
		}

		const itemWidth =
			(itemContainerWidth / numColumns) * span + margin * (span - 1);
		const itemHeight = scale(120);

		currentRow.push(
			<TouchableOpacity
				key={item.toString()}
				style={{
					borderRadius: scale(8),
					width: itemWidth,
					height: itemHeight,
					marginRight: margin,
					marginBottom: margin
				}}>
				<Image
					source={require('@assets/images/profile_cover.jpeg')}
					style={{
						width: '100%',
						height: '100%',
						borderRadius: scale(8)
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
						justifyContent: 'space-between'
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
					justifyContent: 'space-between'
				}}
				key={`row-${grid.length}`}>
				{currentRow}
			</View>
		);
	}

	return grid;
};

export function Profiles() {
	const [search, setSearch] = useState('');

	return (
		<>
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
						letterSpacing: scale(8)
					}}>
					PÚBLICOS
				</Text>
				<Spacer h={16} />
				<Search
					searchCallback={() => {}}
					search={setSearch}
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
						paddingHorizontal: paddingHorizontal
					}}>
					{getGridLayout(data)}

					<Spacer h={16} />
					<Button title={'CARREGAR MAIS'} variant="secondary" />
					<Button title={'Voltar'} />
				</ScrollView>
			</Container>
		</>
	);
}
