import React, {useRef} from 'react';
import {CardDevice} from '@components/CardDevice';
import {ActivityIndicator, FlatList, View} from 'react-native';
import {Spacer} from '@components/Spacer';
import {Icons} from '@assets/icons';
import Text from '@components/Text';

import * as S from './styles';
import {scale} from 'react-native-size-matters';

import {Modalize} from 'react-native-modalize';
import {ModalDevices} from '@components/ModalDevices';
import {Device} from '@models/device';
import theme from '../../styles/theme';

interface ICarousselProps {
  devices: Device[];
  isLoading: boolean;
}

export function Carousel({devices, isLoading}: ICarousselProps) {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => modalizeRef.current?.open();
  const onClose = () => modalizeRef.current?.close();

  return (
    <>
      <Text
        color="#656565"
        variant="bold"
        fontSize={18}
        style={{marginLeft: scale(16)}}>
        Meus Dispositivos
      </Text>

      <Spacer h={16} />

      <View>
        <FlatList
          data={devices}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: scale(16),
            borderWidth: 2,
            borderColor: 'red',
          }}
          horizontal
          renderItem={({item}) => (
            <CardDevice
              key={item.id}
              id={item.id}
              imgURL={item.img_url}
              title={item.name}
              isBluetooth={JSON.parse(item.is_bluetooth)}
            />
          )}
          ListFooterComponent={
            <S.ButtonAdd
              //onPress={onOpen}
              style={{
                elevation: 4,
                marginVertical: scale(4),
                marginRight: scale(8),
              }}>
              <Icons.Plus color={'#6E6E6E'} />

              <Text style={{textAlign: 'center'}} fontSize={14}>
                Adicionar novo dispositivo
              </Text>
            </S.ButtonAdd>
          }
          ListEmptyComponent={() =>
            isLoading ? (
              <View
                style={{
                  marginRight: scale(40),
                  marginLeft: scale(16),
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={theme.COLORS.gold_100} />
              </View>
            ) : null
          }
        />
      </View>

      <ModalDevices ref={modalizeRef} close={onClose} />
    </>
  );
}
