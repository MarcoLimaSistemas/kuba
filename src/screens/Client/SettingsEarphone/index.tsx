import React from 'react';
import * as S from './styles';

import { Button } from '@components/Button';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';
import { Spacer } from '@components/Spacer';
import { View } from 'react-native';
import { Option } from './components/Option';

export function SettingsEarphone() {
	const navigation = useNavigation();

	return (
		<>
			<Header title="Configurações do fone" />
			<S.Container style={{ flexGrow: 1 }}>
				<Spacer h={16} />

				<Option option="Duplo clique direito" zIndex={100} />

				<Spacer h={16} />

				<Option option="Duplo clique esquerdo" zIndex={80} />

				<Spacer h={16} />

				<Option option="Triplo clique direito" zIndex={60} />

				<Spacer h={16} />

				<Option option="Triplo clique esquerdo" zIndex={40} />

				<View style={{ flex: 1 }} />
				<Button title="Voltar" onPress={() => navigation.goBack()} />
			</S.Container>
		</>
	);
}
