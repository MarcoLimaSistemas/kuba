import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import {
  Container,
  Disconnected,
  HFlex,
  Percentage,
  TextStatus,
} from './styles';

import { Lighting } from '@assets/icons'
import useBLE from '@hooks/useBLE';
import { Device } from 'react-native-ble-plx';
export function ButtonConnected() {
  const { requestPermissions, scanForDevices, allDevices } = useBLE()

  const handlePermissions = async () => {
    requestPermissions((isGranted: boolean) => {
      // alert('Then android permission Granted? ' + isGranted)
      if (isGranted) {
        scanForDevices()
      }
    })
  }

  return (
    <Container>
      <TextStatus>{'Desconectado'}</TextStatus>
      <HFlex>
        <Image source={Lighting} />
        <Percentage>{'100%'}</Percentage>
      </HFlex>
      <TouchableOpacity onPress={handlePermissions}>
        <Disconnected>{'Conectar'}</Disconnected>
      </TouchableOpacity>

      {allDevices.map((device: Device) => (
        <TextStatus>
          {device.name}
        </TextStatus>
      ))}
    </Container>
  );
}
