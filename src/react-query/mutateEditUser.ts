import { ISendEmail } from '../models/auth';
import { useNavigation } from '@react-navigation/native';
import User from '@services/user';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

export const useEditUser = () => {
	const navigation = useNavigation();

	const { mutate, isPending } = useMutation({
		mutationFn: User.editInfo,
		onSuccess: () => {
			Toast.show({
				type: 'success',
				text1: 'Perfil atualizado com sucesso!'
			});
			navigation.goBack();
		},
		onError: error => {
			console.error('error :', error);
			Toast.show({
				type: 'error',
				text1: 'Erro ao atualizar perfil!'
			});
		}
	});

	return { mutateEditUser: mutate, isPendingEditUser: isPending };
};
