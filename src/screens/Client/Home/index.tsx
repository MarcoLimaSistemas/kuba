import React from 'react';
import { Button } from '@components/Button';
import { CardNewDevice } from '@components/CardNewDevice';
import { Carousel } from '@components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text } from 'react-native';
import {
  background,
  backgroundSecondary,
  FigureCompleted,
  logoWhite,
  perfil,
} from '../../../assets/images';
import {
  Box,
  BoxLogo,
  BoxPerfil,
  Container,
  ContainerCard,
  ContainerCarousel,
  ContainerImage,
  ContainerModal,
  IconClose,
  Image,
  SubTitle,
  SubTitleModal,
  SubTitleSecondary,
  Title,
  TitleCarousel,
  TitleModal,
  TitleSecondary,
} from './styles';

export function Home() {
  const data = ['#173961', '#556d89', '#BFD5ee', '#Fcfeff'];
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <Container>
      <ScrollView>
        <ContainerImage>
          <Image source={background} />

          <BoxLogo>
            <Image source={logoWhite} />
          </BoxLogo>

          <BoxPerfil onPress={() => navigation.navigate('Profile')}>
            <Image source={perfil} />
          </BoxPerfil>

          <Title>Escola Kuba</Title>
          <SubTitle>Como tirar o melhor som de um fone?</SubTitle>
        </ContainerImage>

        <ContainerCarousel>
          <TitleCarousel>Meus Dispositivos</TitleCarousel>

          <Carousel data={data} />

          <ContainerCard>
            <CardNewDevice />
          </ContainerCard>
        </ContainerCarousel>

        <Box>
          <Image source={backgroundSecondary} />
          <TitleSecondary>Escola Kuba</TitleSecondary>
          <SubTitleSecondary>
            Aprenda mais sobre o mundo do áudio
          </SubTitleSecondary>
        </Box>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ContainerModal>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Pressable onPress={() => setModalVisible(false)}>
                <IconClose>
                  {/* <Ionicons name="close" size={34} color="black" /> */}
                </IconClose>
              </Pressable>
              <Image source={FigureCompleted} />
              <TitleModal>Complete seu Perfil!</TitleModal>
              <SubTitleModal>
                Complete seu perfil para ter uma experiência Kuba completa!
              </SubTitleModal>
              <Button
                title="Completar Perfil"
                onPress={() => navigation.navigate('Profile')}
              />
              <Button title="Mais Tarde" />
            </ScrollView>
          </ContainerModal>
        </Modal>

        <Pressable onPress={() => setModalVisible(true)}>
          <Text>Modal</Text>
        </Pressable>
      </ScrollView>
    </Container>
  );
}
