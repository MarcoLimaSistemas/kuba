import React from 'react';
import { TextInputProps, Image } from 'react-native';
import { ButtonSearch, Container, ContainerInput } from './styles';

import { SearchIcon } from '@assets/icons';

interface Props extends TextInputProps {
	searchCallback: () => void;
	search: (e: string) => void;
	loading: boolean;
}

export function Search({ searchCallback, search, loading, ...rest }: Props) {
	return (
		<Container>
			<ContainerInput {...rest} />
			<ButtonSearch disabled={loading} onPress={searchCallback}>
				<Image source={SearchIcon} />
			</ButtonSearch>
		</Container>
	);
}
