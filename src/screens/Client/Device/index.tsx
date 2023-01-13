import React from 'react'

import { KubaFone } from '@assets/images'
import { Button } from '@components/Button'
import { ButtonConnected } from '@components/ButtonConnected'
import { CarouselProfile } from '@components/CarouselProfile'
import { Navbar } from '@components/Navbar'
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

import { Image } from 'react-native'
import { ButtonSquare } from '@components/ButtonSquare'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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

  return (
    <Container>
      <KeyboardAwareScrollView>
        <Navbar />

        <ImageDevice source={KubaFone} />
        <NameDevice>{'Kuba mali'}</NameDevice>

        <ButtonConnected />

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
    </Container >
  )
}
