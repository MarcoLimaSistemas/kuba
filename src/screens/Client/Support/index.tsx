import React from 'react';

import * as S from './styles';
import { InputUnMasked } from '@components/InputUnMasked';
import { useForm } from 'react-hook-form';
import { Button } from '@components/Button';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Header } from '@components/Header';
import Text from '@components/Text';
import { scale } from 'react-native-size-matters';
import { Spacer } from '@components/Spacer';
import { useMutation } from '@tanstack/react-query';
import { ISupportPayload, sendMessageToSupport } from '@services/support';
import { useAuth } from '@hooks/auth';
import { yupResolver } from '@hookform/resolvers/yup';
import { SupportSchema, TSupportSchema } from '@schemas/support';
import Toast from 'react-native-toast-message';

export function Support() {
	const { user } = useAuth();
	const navigation = useNavigation();

	const { control, handleSubmit, watch } = useForm<TSupportSchema>({
		resolver: yupResolver(SupportSchema),
		defaultValues: {
			component: '',
			description: ''
		}
	});

	const { mutateAsync, isPending } = useMutation({
		mutationFn: (data: ISupportPayload) =>
			sendMessageToSupport(data, user?.id),
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Suporte enviado!'
			});
			navigation.goBack();
		},
		onError: () => {
			Toast.show({
				type: 'error',
				text1: 'Erro ao enviar suporte!'
			});
		}
	});

	const descriptionLength = watch('description').length;

	const submit = (data: TSupportSchema) => {
		mutateAsync(data);
	};

	return (
		<>
			<Header />
			<S.Container>
				<S.ContainerBody
					contentContainerStyle={{ flexGrow: 1 }}
					showsVerticalScrollIndicator={false}>
					<Text
						color="#656565"
						variant="bold"
						style={{
							textAlign: 'center',
							letterSpacing: scale(8)
						}}>
						SUPORTE
					</Text>

					<Spacer h={16} />

					<Text
						fontSize={12}
						variant="lightItalic"
						style={{
							textAlign: 'center'
						}}>
						Descreva seu problema com o máximo possível de detalhes
						para que nossa equipe possa ajudar.
					</Text>

					<Spacer h={16} />

					<InputUnMasked
						control={control}
						label="Componente"
						name="component"
						placeholder="Qual componente está com problemas?"
					/>

					<Spacer h={16} />

					<View>
						<InputUnMasked
							control={control}
							label="Descrição do problema"
							name="description"
							placeholder="Descreva o que está acontecendo."
							multiline
							height={128}
						/>
						<Text
							fontSize={12}
							style={{ textAlign: 'right' }}
							color={
								descriptionLength > 500 ? '#A60000' : '#242424'
							}>
							{descriptionLength}/500
						</Text>
					</View>

					<View style={{ flex: 1 }} />

					<Spacer h={32} />

					<Button
						title="Enviar"
						onPress={handleSubmit(submit)}
						activeLoad={isPending}
					/>
					<Button
						title="DÚVIDAS FREQUENTES"
						onPress={() => {
							navigation.navigate('FrequentlyQuestions');
						}}
						variant="secondary"
					/>
					<Button
						title="Voltar"
						onPress={() => navigation.goBack()}
					/>
				</S.ContainerBody>
			</S.Container>
		</>
	);
}
