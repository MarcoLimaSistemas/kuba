import React, { useEffect } from 'react';
import { forwardRef } from 'react';
import { Modalize, ModalizeProps } from 'react-native-modalize';
import Text from '@components/Text';
import { Icons } from '@assets/icons';
import { scale } from 'react-native-size-matters';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import theme from '../../styles/theme';
import { useBluetooth } from '../../context/BluetoothContext';
import { Button } from '@components/Button';
import * as S from './styles';

interface IModalDevices extends ModalizeProps {
	close(): void;
}

export const ModalDevices = forwardRef(
	({ close, ...rest }: IModalDevices, ref) => {
		const { searchingDevices, devices, scanDevices, pairToDevice } =
			useBluetooth();

		return (
			<Modalize
				{...rest}
				ref={ref}
				modalHeight={400}
				withHandle={false}
				onOpen={() => scanDevices()}
				HeaderComponent={
					<S.Header>
						<View
							style={{
								width: scale(16),
								height: scale(16)
							}}
						/>
						<Text variant="bold">Dispositivos encontrados</Text>
						<TouchableOpacity onPress={close}>
							<Icons.Close width={scale(16)} height={scale(16)} />
						</TouchableOpacity>
					</S.Header>
				}
				flatListProps={{
					contentContainerStyle: {
						flexGrow: 1,
						paddingHorizontal: scale(16)
					},
					data: devices,
					renderItem: ({ item }) => (
						<S.Device
							key={item.id}
							onPress={() => pairToDevice(item)}>
							<Text>
								<Text variant="bold">Dispositivo: </Text>
								<Text>{item.name ?? item.id}</Text>
							</Text>
						</S.Device>
					),
					ListEmptyComponent: () =>
						searchingDevices ? (
							<View
								style={{
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center'
								}}>
								<ActivityIndicator
									color={theme.COLORS.gold_100}
								/>
							</View>
						) : null,
					ListFooterComponent: (
						<>
							<Button title="Parar busca" onPress={() => {}} />
							{/* <Button title="Fechar" onPress={() => {}} /> */}
						</>
					),
					ListFooterComponentStyle: {
						position: 'absolute',
						bottom: 0,
						left: 0,
						right: 0,
						paddingHorizontal: scale(16)
					}
				}}
			/>
		);
	}
);
