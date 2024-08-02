import { Button } from '@components/Button';
import { useModal } from '@hooks/modal';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, Platform, Pressable, ScrollView, View } from 'react-native';

import {
	Container,
	ContainerModal,
	IconClose,
	IconTrash,
	TitleModal
} from './styles';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import Trash from '@assets/icons/trash-2.svg';

interface ModalDeleteProps {
	visible: boolean;
	onClose(): void;
}

export function ModalDelete({ visible, onClose }: ModalDeleteProps) {
	return (
		<Modal animationType="slide" transparent={true} visible={visible}>
			<Container>
				<ContainerModal>
					<Spacer h={16} />

					<Pressable
						onPress={() => {
							onClose();
						}}>
						<IconClose>
							<Icons.Close width={scale(12)} height={scale(12)} />
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

					<Button title="Excluir" />
					<Button
						title="Voltar"
						variant="secondary"
						onPress={() => onClose()}
					/>
				</ContainerModal>
			</Container>
		</Modal>
	);
}
