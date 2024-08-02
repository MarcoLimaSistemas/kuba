import React from 'react';
import { TextInputProps } from 'react-native';
import { ButtonSearch, Container, ContainerInput } from './styles';

import { Icons } from '@assets/icons';
import theme from '../../styles/theme';

interface Props extends TextInputProps {
	searchCallback: () => void;
	search: (e: string) => void;
	loading: boolean;
	typeButton?: 'black' | 'white';
}

export function Search({
	searchCallback,
	search,
	loading,
	typeButton = 'white',
	...rest
}: Props) {
	return (
		<Container>
			<ContainerInput
				placeholderTextColor={
					rest?.placeholderTextColor
						? rest.placeholderTextColor
						: '#FFF'
				}
				{...rest}
			/>
			<ButtonSearch
				disabled={loading}
				onPress={searchCallback}
				style={{
					backgroundColor:
						typeButton === 'black'
							? theme.COLORS.black
							: theme.COLORS.white_100
				}}>
				<Icons.Search
					color={
						typeButton === 'black'
							? theme.COLORS.gold_100
							: theme.COLORS.black
					}
				/>
			</ButtonSearch>
		</Container>
	);
}
