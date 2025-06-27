import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	ReactNode,
} from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import RNBluetoothClassic, {
	BluetoothDevice,
} from 'react-native-bluetooth-classic';

interface AppState {
  device?: BluetoothDevice;
  bluetoothEnabled: boolean;
}

interface BluetoothContextType {
	searchingDevices: boolean;
	devices: BluetoothDevice[];
	connectedDevice: BluetoothDevice | null;
	scanDevices: () => Promise<void>;
	stopScanDevices(): Promise<void>;
	connectToDevice: (device: BluetoothDevice) => Promise<void>;
	disconnectFromDevice: () => Promise<void>;
	pairToDevice: (device: BluetoothDevice) => Promise<void>;
	state:AppState;
	setState:React.Dispatch<React.SetStateAction<AppState>>
}

interface BluetoothProviderProps {
	children: ReactNode;
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(
	undefined
);

export const BluetoothProvider: React.FC<BluetoothProviderProps> = ({
	children,
}) => {
	const [searchingDevices, setSearchingDevices] = useState(false);
	const [devices, setDevices] = useState<BluetoothDevice[]>([]);
	const [connectedDevice, setConnectedDevice] =
		useState<BluetoothDevice | null>(null);
		const [state, setState] = useState<AppState>({
			device: undefined,
			bluetoothEnabled: true,
		});

	useEffect(() => {
		if (Platform.OS === 'android') {
			requestBluetoothPermission();
		}
	}, []);

	const requestBluetoothPermission = async () => {
		try {
			await PermissionsAndroid.requestMultiple([
				PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
				PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
				PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
			]);
		} catch (err) {
			console.warn(err);
		}
	};

	const scanDevices = async () => {
		try {
			setSearchingDevices(true);
			const unpairedDevices = await RNBluetoothClassic.startDiscovery();

			console.log('Unpaired devices', unpairedDevices);
			setDevices(unpairedDevices);
		} catch (error) {
			console.log('Error during discovery', error);
		} finally {
			setSearchingDevices(false);
		}
	};

	const stopScanDevices = async () => {
		const isScanning = await RNBluetoothClassic.cancelDiscovery();
		setSearchingDevices(isScanning);
	};

	const connectToDevice = async (device: BluetoothDevice) => {
		try {
			const connected = await RNBluetoothClassic.connectToDevice(
				device.address
			);
			console.log('Connected to device', connected);
			setConnectedDevice(connected);
		} catch (error) {
			console.log('Error connecting to device', error);
		}
	};

	const pairToDevice = async (device: BluetoothDevice) => {
		try {
			const devicePaired = await RNBluetoothClassic.pairDevice(
				device.address
			);
			console.log('Paired to device', devicePaired);
			setConnectedDevice(devicePaired);
		} catch (error) {
			console.log('Error pairing to device', error);
		}
	};
	const disconnectFromDevice = async () => {
		if (connectedDevice) {
			try {
				await connectedDevice.disconnect();
				setConnectedDevice(null);
				console.log('Dispositivo desconectado');
			} catch (error) {
				console.error('Erro ao desconectar do dispositivo:', error);
			}
		}
	};

	return (
		<BluetoothContext.Provider
			value={{
				searchingDevices,
				devices,
				connectedDevice,
				scanDevices,
				stopScanDevices,
				connectToDevice,
				pairToDevice,
				disconnectFromDevice,
				state,
				setState,
			}}>
			{children}
		</BluetoothContext.Provider>
	);
};

export const useBluetooth = (): BluetoothContextType => {
	const context = useContext(BluetoothContext);
	if (context === undefined) {
		throw new Error('useBluetooth must be used within a BluetoothProvider');
	}
	return context;
};
