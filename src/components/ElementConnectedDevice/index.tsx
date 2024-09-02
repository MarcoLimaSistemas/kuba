
import {  Image, TouchableOpacity, View } from 'react-native';

import * as S from './styles';

import { BluetoothDevice } from 'react-native-bluetooth-classic';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { Lighting } from '@assets/icons';

interface ElementConnectedDeviceProps {
  connectedDevice: BluetoothDevice | null;
  connectToDevice?:void;
}

export function ElementConnectedDevice({ connectedDevice,connectToDevice}: ElementConnectedDeviceProps) {
  return (

						<S.ContainerConnections>
							{connectedDevice !== null ? (
								<>
									<Text
										fontSize={12}
										variant="bold"
										color="#777777">
										CONECTADO
									</Text>

									<View
										style={{
											flexDirection: 'row',
											alignItems: 'center'
										}}>
										<Image source={Lighting} />
										<Spacer w={8} />
										<Text>{'100%'}</Text>

										<Spacer w={16} />
										<TouchableOpacity
											onPress={() => {
												// connectToDevice()
											}}>
											<Text
												color="#2E9CCB"
												variant="bold">
												Desconectar
											</Text>
										</TouchableOpacity>
									</View>
								</>
							) : (
								<>
									<Text
										fontSize={12}
										variant="bold"
										color="#777777">
										DESCONECTADO
									</Text>

									<TouchableOpacity onPress={() => {}}>
										<Text color="#2E9CCB" variant="bold">
											Conectar
										</Text>
									</TouchableOpacity>
								</>
							)}
						</S.ContainerConnections>
  
  );
}
