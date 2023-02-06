import React, { useEffect } from 'react';
import api from '../../../services/api';

import { Button } from '@components/Button';
import { Carousel } from '@components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, Pressable, Image, Alert } from 'react-native';

import {
  background,
  backgroundSecondary,
  FigureCompleted,
  logoWhite,
  perfil,
} from '@assets/images';

import { Close } from '@assets/icons'

import {
  ButtonPerfil,
  ButtonModal,
  Container,
  ContainerHeader,
  ContainerModal,
  ContainerSchoolKuba,
  IconClose,
  ImageHeaderHome,
  ImageModalContainer,
  ImageSchoolKuba,
  SubTitle,
  SubTitleModal,
  SubTitleSecondary,
  Title,
  TitleModal,
  TitleSecondary,
} from './styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { DeviceProps } from '@models/device';

export function Home() {
  const [devices, setDevices] = useState<DeviceProps[]>([])

  async function getDevices() {
    try {
      const { data } = await api.get('/user/products/index')
      setDevices(data)
    } catch (error: any) {
      Alert.alert(error.response.data.message)
    }
  }

  useEffect(() => {
    getDevices();
  }, [])

  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <Container>
      <ImageHeaderHome source={background} />

      <ContainerHeader>
        <Image source={logoWhite} />
        <ButtonPerfil onPress={() => navigation.navigate('Profile')}>
          <Image source={perfil} />
        </ButtonPerfil>
      </ContainerHeader>

      <Title>Escola Kuba</Title>
      <SubTitle>Como tirar o melhor som de um fone?</SubTitle>

      <Carousel data={devices} />

      <ButtonModal onLongPress={() => setModalVisible(true)} />

      <ContainerSchoolKuba onPress={() => navigation.navigate('School')}>
        <ImageSchoolKuba source={backgroundSecondary} />
        <TitleSecondary>Escola Kuba</TitleSecondary>
        <SubTitleSecondary>
          Aprenda mais sobre o mundo do áudio
        </SubTitleSecondary>
      </ContainerSchoolKuba>

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ContainerModal>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Pressable onPress={() => setModalVisible(false)}>
              <IconClose>
                <Image source={Close} />
              </IconClose>
            </Pressable>

            <ImageModalContainer>
              <Image source={FigureCompleted} />
            </ImageModalContainer>

            <TitleModal>Complete seu Perfil!</TitleModal>
            <SubTitleModal>
              Complete seu perfil para ter uma experiência Kuba completa!
            </SubTitleModal>
            <Button
              title='Completar Perfil'
              onPress={() => navigation.navigate('Profile')}
            />
            <Button
              title='Mais Tarde'
              variant='secondary'
              onPress={() => setModalVisible(false)}
            />
          </KeyboardAwareScrollView>
        </ContainerModal>
      </Modal>
    </Container >
  );
}
