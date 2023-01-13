import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import {
  Container,
  Disconnected,
  HFlex,
  Percentage,
  TextStatus,
} from './styles';

import useBLE from '@hooks/useBLE';
import { Lighting } from '@assets/icons'
import { Device } from 'react-native-ble-plx';

export function ButtonConnected() {
  const { requestPermissions, scanForDevices, allDevices } = useBLE()
  const [status, setStatus] = useState(false)

  const handlePermissions = async () => {
    requestPermissions((isGranted: boolean) => {
      if (isGranted) {
        scanForDevices()
      }
    })
  }

  return (
    <Container>
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

    </Container>
  );
}
