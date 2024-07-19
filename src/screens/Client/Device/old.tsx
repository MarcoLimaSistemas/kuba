import React, { useState } from 'react'

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
  FooterModal,
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

export function Device({ route, }: any) {
  console.log('DeviceID: ', route.params.deviceID)

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
    onStopSearch,
    setStopSearch,
    modalVisible,
    setModalVisible,
    allDevices,
    onScanDevices,
    onStopScan,
    connectToDevice
  } = useBLE()

  const [status, setStatus] = useState(false)

  async function handlePermissions() {
    requestPermissions(async (isGranted: boolean) => {
      if (isGranted) {
        setStopSearch(false)
        onScanDevices()
      }
    })
  }

  async function handleCancelSearchDevices() {
    onStopScan()
    setStopSearch(true)
  }

  async function handleCloseModal() {
    onStopScan()
    setModalVisible(false)
  }

  return (
    <Container>
      <Navbar />

      <ImageDevice source={KubaFone} />
      <NameDevice>{'Kuba mali'}</NameDevice>

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

      <BoxButtons
      style={{
        paddingHorizontal:16
      }}
      >
        <ButtonSquare label='Suporte' onPress={() => navigation.navigate('Support')}>
          <Image source={Headset} 
          style={{
            width:32,
            height:32
          }}
          resizeMode='contain'
          />
        </ButtonSquare>

        <ButtonSquare label='Tutorias de uso' onPress={() => navigation.navigate('Tutorials')}>
          <Image source={Info}
          style={{
            width:32,
            height:32
          }}
          resizeMode='contain'
          />
        </ButtonSquare>
      </BoxButtons >

      <Footer>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </Footer >

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ContainerModal>
          <HeaderModal>
            <TitleModal>Dispositivos encontrados</TitleModal>
            <Pressable onPress={handleCloseModal}>
              <Image source={Close} />
            </Pressable>
          </HeaderModal>

          {allDevices.map(device => (
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
              <DeviceModal key={device.id}>
                <DeviceTitle onPress={() => connectToDevice(device)}>{device.name || device.id}</DeviceTitle>
              </DeviceModal>
            </KeyboardAwareScrollView>
          ))}
          <FooterModal>
            {onStopSearch ?
              <Button title="Fechar" onPress={() => setModalVisible(false)} />
              :
              <Button title="Parar busca" onPress={() => handleCancelSearchDevices()} />
            }
          </FooterModal>
        </ContainerModal>
      </Modal>
    </Container >
  )
}