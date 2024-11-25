
import {  Image, TouchableOpacity, View } from 'react-native';

import * as S from './styles';

import { BluetoothDevice } from 'react-native-bluetooth-classic';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';
import { Lighting } from '@assets/icons';
import { useBluetooth } from '../../context/BluetoothContext';
import { useNavigation } from '@react-navigation/native';

interface ElementConnectedDeviceProps {
  connectedDevice: BluetoothDevice | null;
  connectToDevice:(device: BluetoothDevice) => void;
	deviceName?:string;
	isNavigateHome?:boolean;
}

export function ElementConnectedDevice({ 
	connectedDevice,
	connectToDevice,
	isNavigateHome,
	deviceName
}	: ElementConnectedDeviceProps) {
	const { navigate } = useNavigation<any>();

	const {state,setState } = useBluetooth();
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
											onPress={async() => {
												await state.device?.disconnect()
												setState({
													device:undefined,
													bluetoothEnabled: true,
												})
												if(isNavigateHome){
													return navigate("Home")
												}

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
									{deviceName ? deviceName: 'DESCONECTADO'}
									</Text>

									<TouchableOpacity onPress={() => {
												 connectToDevice(connectedDevice)
											}}>
										<Text color="#2E9CCB" variant="bold">
											Conectar
										</Text>
									</TouchableOpacity>
								</>
							)}
						</S.ContainerConnections>
  
  );
}
