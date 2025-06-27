import React, { useState, useEffect } from 'react';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import {
  PermissionsAndroid,
  View,
  FlatList,
  TouchableOpacity,
  Button as RNButton,
  StyleSheet,
} from 'react-native';
import Text from '@components/Text';
import { ElementConnectedDevice } from '@components/ElementConnectedDevice';
import { useBluetooth } from '../../context/BluetoothContext';

const requestAccessFineLocationPermission = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
      title: 'Access fine location required for discovery',
      message: 'In order to perform discovery, you must enable/allow ' + 'fine location access.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    }
  );
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};

interface DeviceListScreenProps {
  selectDevice: (device: BluetoothDevice) => void;
}

const DeviceListScreen: React.FC<DeviceListScreenProps> = ({  selectDevice }) => {
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [accepting, setAccepting] = useState(false);
  const [discovering, setDiscovering] = useState(false);
 const { state } = useBluetooth();

  useEffect(() => {
    getBondedDevices();
    return () => {
      if (accepting) {
        cancelAcceptConnections();
      }

      if (discovering) {
        cancelDiscovery();
      }
    };
  }, []);

  const getBondedDevices = async (unloading?: boolean) => {
    try {
      let bonded = await RNBluetoothClassic.getBondedDevices();
      if (!unloading) {
        setDevices(bonded);
      }
    } catch (error: any) {
      setDevices([]);

      console.error(error.message);
    }
  };

  const acceptConnections = async () => {
    if (accepting) {
      console.error('Already accepting connections');
      return;
    }

    setAccepting(true);

    try {
      let device = await RNBluetoothClassic.accept({ delimiter: '\r' });
      if (device) {
        selectDevice(device);
      }
    } catch (error) {
      if (!accepting) {
        console.error('Attempt to accept connection failed.');
      }
    } finally {
      setAccepting(false);
    }
  };

  const cancelAcceptConnections = async () => {
    if (!accepting) {
      return;
    }

    try {
      let cancelled = await RNBluetoothClassic.cancelAccept();
      setAccepting(!cancelled);
    } catch (error) {
      console.error('Unable to cancel accept connection');
    }
  };

  const startDiscovery = async () => {
    try {
      let granted = await requestAccessFineLocationPermission();

      if (!granted) {
        throw new Error('Access fine location was not granted');
      }

      setDiscovering(true);
      let devicesCopy = [...devices];

      try {
        let unpaired = await RNBluetoothClassic.startDiscovery();

        let index = devicesCopy.findIndex((d) => !d.bonded);
        if (index >= 0) {
          devicesCopy.splice(index, devicesCopy.length - index, ...unpaired);
        } else {
          devicesCopy.push(...unpaired);
        }

        console.log(`Found ${unpaired.length} unpaired devices.`);
      } finally {
        setDevices(devicesCopy);
        setDiscovering(false);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const cancelDiscovery = async () => {
    try {
    } catch (error) {
      console.error('Error occurred while attempting to cancel discover devices');
    }
  };

  const requestEnabled = async () => {
    try {
    } catch (error: any) {
      console.error(`Error occurred while enabling bluetooth: ${error.message}`);
    }
  };

  let toggleAccept = accepting ? () => cancelAcceptConnections() : () => acceptConnections();

  let toggleDiscovery = discovering
    ? () => cancelDiscovery()
    : () => {
        startDiscovery();
        getBondedDevices();
      };

  return (
    <View style={styles.container}>
      {state.bluetoothEnabled ? (
        <>
          <DeviceList devices={devices} onPress={selectDevice} />
          {/* <View style={styles.buttonContainer}>
            <RNButton
              title={accepting ? 'Accepting (cancel)...' : 'Accept Connection'}
              onPress={toggleAccept}
            />
            <RNButton
              title={discovering ? 'Discovering (cancel)...' : 'Discover Devices'}
              onPress={toggleDiscovery}
            />
          </View> */}
        </>
      ) : (
        <View style={styles.center}>
            <Text
				fontSize={12}
				variant="bold"
				color="#777777">Bluetooth está desligado</Text>

          {/* <RNButton title="Enable Bluetooth" onPress={() => requestEnabled()} /> */}
        </View>
      )}
    </View>
  );
};

interface DeviceListProps {
  devices: BluetoothDevice[];
  onPress: (device: BluetoothDevice) => void;
}

const filterDevicesPerName = ( devices: BluetoothDevice[])=> {
 return devices.filter((item)=> item.name === 'Kuba Disco' || item.name === 'Kuba Disco Bluetooth');
};

const DeviceList: React.FC<DeviceListProps> = ({ devices, onPress }) => {
 const devicesFilter = filterDevicesPerName(devices);
  const renderItem = ({ item }: { item: BluetoothDevice }) => {
    return <DeviceListItem device={item} onPress={onPress} />;
  };

  return <FlatList data={devicesFilter} renderItem={renderItem} keyExtractor={(item) => item.address} />;
};

interface DeviceListItemProps {
  device: BluetoothDevice & { connected?: boolean };
  onPress: (device: BluetoothDevice) => void;
}

const DeviceListItem: React.FC<DeviceListItemProps> = ({ device, onPress }) => {
  let bgColor = device.connected ? '#0f0' : '#fff';
  let icon = device.bonded ? 'ios-bluetooth' : 'ios-cellular';

  return (
    <>
        <ElementConnectedDevice
					connectToDevice={() => onPress(device)}
          deviceName={device.name}
					connectedDevice={null}
					 />

    {/* <TouchableOpacity onPress={() => onPress(device)} style={styles.deviceListItem}>
      <View style={styles.deviceListItemIcon}>
        <Text style={{color:"#000"}}>{icon}</Text>
      </View>
      <View>

      <Text
				fontSize={10}
				variant="bold"
				color="#777777">
				{`${device.name}`}
				  </Text>
         <Text style={{color:"#000"}}>{device.name}</Text>
         <Text style={{color:"#000"}}>{device.address}</Text>

      </View>
    </TouchableOpacity> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 16,
    gap: 10,
  },
  deviceListItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  deviceListItemIcon: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DeviceListScreen;
