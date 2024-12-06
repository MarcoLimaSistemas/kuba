import { Button } from '@components/Button';
import React, { forwardRef } from 'react';
import { Pressable, View } from 'react-native';

import { Container, ContainerModal, IconClose, IconTrash } from './styles';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import Trash from '@assets/icons/trash-2.svg';
import { Modalize } from 'react-native-modalize';

import { useMutation } from '@tanstack/react-query';
import { deletePreset } from '@services/preset';
import { useAuth } from '@hooks/auth';
import { queryClient } from '../../../App';
import { IPreset } from '@models/preset';
import Toast from 'react-native-toast-message';
import { deletePresetInternal } from '@services/internal-storage';

interface ModalDeleteProps {
	currentPreset: IPreset | null;
	onClose(): void;
}

export const ModalDelete = forwardRef(
	({ onClose, currentPreset }: ModalDeleteProps, ref) => {

		const { mutateAsync, isPending } = useMutation({
			mutationKey: ['DeletePreset'],
			mutationFn: () => deletePresetInternal(currentPreset?.id ? currentPreset?.id : 0),

			onSuccess() {
				queryClient.invalidateQueries({ queryKey: ['MyPresets'] });
				Toast.show({
					type: 'success',
					text1: 'Preset deletado!'
				});
				onClose();
			}
		});

		const handleDelete = () => {
			mutateAsync();

		};

		return (
			<Modalize ref={ref} adjustToContentHeight withHandle={false}>
				<Container>
					<ContainerModal>
						<Spacer h={16} />

						<Pressable
							onPress={() => {
								onClose();
							}}>
							<IconClose>
								<Icons.Close
									width={scale(12)}
									height={scale(12)}
								/>
							</IconClose>
						</Pressable>

						<Spacer h={64} />
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center'
							}}>
							<Text
								variant="bold"
								style={{ textAlign: 'center', width: '70%' }}>
								REALMENTE DESEJA EXCLUIR ESTE PRESET?
							</Text>
						</View>

						<IconTrash>
							<Trash width={scale(96)} height={scale(96)} />
						</IconTrash>

						<Button
							title="Excluir"
							activeLoad={isPending}
							onPress={handleDelete}
						/>
						<Button
							title="Voltar"
							variant="secondary"
							onPress={() => onClose()}
						/>
					</ContainerModal>
				</Container>
			</Modalize>
		);
	}
);
