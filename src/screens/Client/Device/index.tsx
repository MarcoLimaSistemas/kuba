import React, { useState } from 'react'

import { KubaFone } from '@assets/images'
import { Button } from '@components/Button'
import { ButtonConnected } from '@components/ButtonConnected'
import { CarouselProfile } from '@components/CarouselProfile'
import { ModalPreset } from '@components/ModalPreset'
import { Navbar } from '@components/Navbar'
import { useModal } from '@hooks/modal'
import { useNavigation } from '@react-navigation/native'

import { Headset, Info, Settings } from '@assets/icons';

import {
  BoxButtons,
  Container,
  ContainerCarousel,
  Footer,
  ImageDevice,
  NameDevice,
} from './styles'

import { Image, NativeModules, ScrollView } from 'react-native'
import { ButtonSquare } from '@components/ButtonSquare'

export function Device() {

  const data = ['#173961', '#556d89', '#BFD5ee', '#Fcfeff']
  const navigation = useNavigation()

  const { setOpenModal } = useModal()
  const [isEdit, setIsEdit] = useState(false)

  function handleModalEdit() {
    setOpenModal(true)
    setIsEdit(true)
  }
  function handleModalAdd() {
    setOpenModal(true)
    setIsEdit(false)
  }

  return (
    <Container>
      <ScrollView>
        <Navbar />

        <ImageDevice source={KubaFone} />
        <NameDevice>{'Kuba mali'}</NameDevice>

        <ButtonConnected />

        <BoxButtons>
          <Button title="Equalizador" onPress={() => NativeModules.EqualizerModule.navigateToEqualizer()} />
        </BoxButtons>

        <ContainerCarousel>
          <CarouselProfile titleProfile={'Perfis Personalizados'} data={data} />
          <CarouselProfile titleProfile={'Perfis Públicos '} data={data} />
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
        <ModalPreset isEdit={isEdit} />
      </ScrollView >
    </Container >
  )
}
