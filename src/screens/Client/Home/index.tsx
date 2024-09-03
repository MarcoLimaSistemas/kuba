import React, { useEffect, useRef, useState } from 'react';

import {Carousel} from '@components/Carousel';
import {useNavigation, useRoute} from '@react-navigation/native';

import {background, backgroundSecondary} from '@assets/images';

import {
  Container,
  ContainerHeader,
  ContainerSchoolKuba,
  ImageHeaderHome,
  ImageSchoolKuba,
} from './styles';

import {Header} from '@components/Header';
import Text from '@components/Text';
import {scale} from 'react-native-size-matters';
import {Spacer} from '@components/Spacer';
import {View} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {getProducts} from '@services/product';
import {useAuth} from '@hooks/auth';
import { ModalCompletedProfile } from '@components/ModalCompletedProfile';
import { Modalize } from 'react-native-modalize';

export function Home() {
  const {user} = useAuth();
	const modalizeRef = useRef<Modalize>(null);


	const route = useRoute();
	const modal = route.params as any;
  const hasModalActive = modal !== undefined && modal.modalActive === true
  const [modaVisible, setModalVisible] = useState(false)

  const onOpen = () => modalizeRef.current?.open();
  const closeModal = () => {
    setModalVisible(false);
    modalizeRef.current?.close()
  };

  const {data: devices, isLoading} = useQuery({
    queryKey: ['Devices'],
    queryFn: () => getProducts(user?.id),
  });

    const navigation = useNavigation();

    useEffect(() => {
      if (hasModalActive) {
        setModalVisible(true);
        onOpen();
      }
    }, [route.params]);

  return (
    <>
      <ContainerHeader>
        <Header typeLogo="white" />
        <ImageHeaderHome source={background} />

        <View
          style={{
            paddingHorizontal: scale(16),
            marginTop: 'auto',
          }}>
          <Text color="#FFF" variant="light">
            Escola Kuba
          </Text>
          <Spacer h={4} />
          <Text variant="bold" color="#FFF">
            Como tirar o melhor som de um fone?
          </Text>
        </View>
        <Spacer h={16} />
      </ContainerHeader>

      <Spacer h={32} />

      <Carousel devices={devices} isLoading={isLoading} />

      <Container>
        <Spacer h={16} />
        <ContainerSchoolKuba onPress={() => navigation.navigate('School')}>
          <ImageSchoolKuba source={backgroundSecondary} />

          <View
            style={{
              position: 'absolute',
              justifyContent: 'center',
              alignItems: 'center',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              flex: 1,
              paddingHorizontal: scale(16),
            }}>
            <View>
              <Text
                color="#FFF"
                variant="bold"
                style={{
                  textAlign: 'center',
                  letterSpacing: scale(6),
                }}>
                ESCOLA KUBA
              </Text>
              <Spacer h={8} />
              <Text fontSize={12} color="#FFF" style={{textAlign: 'center'}}>
                Aprenda mais sobre o mundo do áudio
              </Text>
            </View>
          </View>
        </ContainerSchoolKuba>

        <Spacer h={16} />
      </Container>
      <ModalCompletedProfile
				ref={modalizeRef}
				onClose={() => closeModal()}
			/>
    </>
  );
}
