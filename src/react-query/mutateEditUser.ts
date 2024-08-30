import { ISendEmail } from '../models/auth';
import { useNavigation } from '@react-navigation/native';
import User, { IEditInfoProps } from '@services/user';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { queryClient } from '../../App';

export const useEditUser = () => {
	const navigation = useNavigation();

	const { mutate, isPending } = useMutation({
		mutationFn: ({ userId, data }: IEditInfoProps) =>
			User.editInfo({
				userId,
				data
			}),
		onSuccess: async () => {
			Toast.show({
				type: 'success',
				text1: 'Perfil atualizado com sucesso!'
			});
			await queryClient.invalidateQueries({ queryKey: ['userDetails'] });
			navigation.goBack();
		},
		onError: (error:any )=> {
			console.error('error :', error.response.data.message);
			Toast.show({
				type: 'error',
				text1: 'Erro ao atualizar perfil!'
			});
		}
	});

	return { mutateEditUser: mutate, isPendingEditUser: isPending };
};
