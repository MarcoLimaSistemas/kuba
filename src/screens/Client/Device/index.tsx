import React, { useEffect, useState } from 'react'

import { KubaFone } from '@assets/images'
import { Button } from '@components/Button'
import { CarouselProfile } from '@components/CarouselProfile'
import { Navbar } from '@components/Navbar'
import { useNavigation } from '@react-navigation/native'

import { Close, Headset, Info, Lighting, Settings } from '@assets/icons';

import {
  BoxButtons,
  Container,
  ContainerCarousel,
  ContainerConnections,
  ContainerModal,
  DeviceModal,
  DeviceTitle,
  Disconnected,
  Footer,
  HeaderModal,
  HFlex,
  ImageDevice,
  NameDevice,
  Percentage,
  TextStatus,
  TitleModal,
} from './styles'

import { Image, Modal, Pressable, TouchableOpacity } from 'react-native'
import { ButtonSquare } from '@components/ButtonSquare'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import useBLE from '@hooks/useBLE'
import { Toast } from 'react-native-toast-message/lib/src/Toast'

export function Device() {
  const navigation = useNavigation()

  const dataExample = [
    {
      id: 1,
      name: 'Cliolo'
    },
    {
      id: 2,
      name: 'Cliolo'
    },
    {
      id: 3,
      name: 'Cliolo'
    },
    {
      id: 4,
      name: 'Cliolo'
    },
  ]

  const { requestPermissions,
    modalVisible,
    setModalVisible,
    allDevices,
    onScanDevices,
    onStopScan
  } = useBLE()

  const [status, setStatus] = useState(false)

  async function handlePermissions() {
    requestPermissions(async (isGranted: boolean) => {
      if (isGranted) {
        onScanDevices()
      }
    })
  }

  async function onCloseModal() {
    onStopScan()
    setModalVisible(false)
  }

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Navbar />

        <ImageDevice source={KubaFone} />
        <NameDevice>{'Kuba mali'}</NameDevice>

        {/* <ButtonConnected /> */}

        <ContainerConnections>
          {status ?
            <>
              <TextStatus>Conectado</TextStatus>
              <HFlex>
                <Image source={Lighting} />
                <Percentage>{'100%'}</Percentage>
              </HFlex>
              <TouchableOpacity onPress={handlePermissions}>
                <Disconnected>{'Desconectar'}</Disconnected>
              </TouchableOpacity>
            </>
            :
            <>
              <TextStatus>Desconectado</TextStatus>

              <TouchableOpacity onPress={handlePermissions}>
                <Disconnected>Conectar</Disconnected>
              </TouchableOpacity>
            </>
          }
        </ContainerConnections>

        {/* <BoxButtons>
          <Button title="Equalizador" onPress={() => NativeModules.EqualizerModule.navigateToEqualizer()} />
        </BoxButtons> */}

        <ContainerCarousel>
          <CarouselProfile titleProfile={'Perfis Personalizados'} data={dataExample} />
          <CarouselProfile titleProfile={'Perfis Públicos '} data={dataExample} />
        </ContainerCarousel>

        <BoxButtons>
          <ButtonSquare label='Suporte' onPress={() => navigation.navigate('FrequentlyQuestions')}>
            <Image source={Headset} />
          </ButtonSquare>

          <ButtonSquare label='Tutorias de uso' onPress={() => navigation.navigate('Tutorials')}>
            <Image source={Info} />
          </ButtonSquare>

          <ButtonSquare label='Configurações' onPress={() => console.log('Ir para configurações')}>
            <Image source={Settings} />
          </ButtonSquare>
        </BoxButtons >

        <Footer>
          <Button title="Voltar" onPress={() => navigation.goBack()} />
        </Footer >
      </KeyboardAwareScrollView >

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ContainerModal>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <HeaderModal>
              <TitleModal>Dispositivos</TitleModal>
              <Pressable onPress={onCloseModal}>
                <Image source={Close} />
              </Pressable>
            </HeaderModal>

            {allDevices.map(device => (
              <DeviceModal key={device.id}>
                <DeviceTitle onPress={() => console.log(device.id)}>{device.name || device.id}</DeviceTitle>
              </DeviceModal>
            ))}
          </KeyboardAwareScrollView>
        </ContainerModal>
      </Modal>
    </Container >
  )
}
