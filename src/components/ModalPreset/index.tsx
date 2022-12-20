import { Button } from '@components/Button';
import { ModalDelete } from '@components/ModalDelete';
import { useModal } from '@hooks/modal';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { IPresets } from 'src/models/preset';

import {
  Container,
  ContainerButtonDelete,
  ContainerModal,
  ContainerSwitch,
  Footer,
  Header,
  IconClose,
  Input,
  InputContainer,
  TextDelete,
  TextSwitch,
  TitleModal,
} from './styles';

interface ModalPresetProps {
  isEdit: boolean;
}

export function ModalPreset({ isEdit }: ModalPresetProps) {
  // const [modalVisible, setModalVisible] = useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Rock ', value: 'rock' },
    { label: 'sertanejo', value: 'sertanejo' },
  ]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IPresets>();
  const { openModal, setOpenModal, setOpenModalDelete } = useModal();
  //switch
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const navigation = useNavigation();
  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={() => {
          setOpenModal(!openModal);
        }}
      >
        <ContainerModal>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Header>
              <TitleModal>
                {isEdit ? 'Editar Preset' : 'Salvar Preset'}
              </TitleModal>
              <Pressable onPress={() => setOpenModal(false)}>
                <IconClose>
                  {/* <Ionicons name="close" size={30} color="black" /> */}
                </IconClose>
              </Pressable>
            </Header>
            <InputContainer>
              <Input placeholder={'Nome do preset'} {...register('name')} />

              <Input
                placeholder="Descrição (opcional)"
                {...register('description')}
                multiline
                keyboardType="default"
              />

              <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder={'Gênero'}
              />
            </InputContainer>

            <ContainerSwitch>
              <Switch
                trackColor={{ false: '#656565', true: '#D4BD85' }}
                thumbColor={isEnabled ? '#656565' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <TextSwitch>Tornar Público</TextSwitch>
            </ContainerSwitch>
            <Footer>
              <Button title="Salvar" />
              <Button
                title="Voltar"
                variant="secondary"
                onPress={() => navigation.goBack()}
              />
              {isEdit && (
                <TouchableOpacity onPress={() => setOpenModalDelete(true)}>
                  <ContainerButtonDelete>
                    <TextDelete>Excluir preset</TextDelete>
                    {/* <FontAwesome
                      name="trash"
                      size={24}
                      color="black"
                      style={{ paddingTop: 9, paddingLeft: 5 }}
                    /> */}
                  </ContainerButtonDelete>
                </TouchableOpacity>
              )}
            </Footer>
          </ScrollView>
        </ContainerModal>
      </Modal>
      <ModalDelete />
    </Container>
  );
}
