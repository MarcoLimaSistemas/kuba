import { Button } from '@components/Button';
import { useModal } from '@hooks/modal';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Modal, Platform, Pressable, ScrollView } from 'react-native';

import {
  Container,
  ContainerModal,
  IconClose,
  IconTrash,
  TitleModal,
} from './styles';

interface ModalDeleteProps {
  visible: boolean;
}

export function ModalDelete() {
  const { openModalDelete, setOpenModalDelete } = useModal();

  const navigation = useNavigation();
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModalDelete}
        onRequestClose={() => {
          setOpenModalDelete(!openModalDelete);
        }}
      >
        <ContainerModal>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={() => setOpenModalDelete(false)}>
              <IconClose>
                {/* <Ionicons name="close" size={30} color="black" /> */}
              </IconClose>
            </Pressable>

            <TitleModal>{'Realmente deseja excluir este Preset'}</TitleModal>
            <IconTrash>
              {/* <FontAwesome name="trash-o" size={104} color="black" /> */}
            </IconTrash>
            <Button title="Excluir" />
            <Button
              title="Voltar"
              variant="secondary"
              onPress={() => navigation.goBack()}
            />
          </ScrollView>
        </ContainerModal>
      </Modal>
    </Container>
  );
}
