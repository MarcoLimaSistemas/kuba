import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, StyleSheet} from 'react-native';
import RNBluetoothClassic from 'react-native-bluetooth-classic';
import {Buffer} from 'buffer';

import EqualizerNew from '@components/Equalizer/models-equalizer/new';
import EqualizerTest from '@components/Equalizer/models-equalizer/test';

import EqualizerJava from '@components/Equalizer/models-equalizer/java';
import EqualizerGaia from '@components/Equalizer/models-equalizer/gaia';
import EqualizerSliders from './models-equalizer/equalizer-sliders';
import MasterGainControl from './models-equalizer/MasterGainControl';
import {BluetoothDevice as GaiaDevice} from '@hooks/useGaiaDevice';

global.Buffer = global.Buffer || Buffer;

interface Message {
  timestamp: Date;
  data: string;
  type: 'receive' | 'sent' | 'info' | 'error';
}

interface ConnectionScreenProps {
  device: any;
  handleScrollEnabled: (enabled: boolean) => void;
  onBack: () => void;
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({
  device,
  onBack,
  handleScrollEnabled,
}) => {
  const [connection, setConnection] = useState<boolean>(true);
  const [data, setData] = useState<Message[]>([]);
  const [polling, setPolling] = useState<boolean>(false);

  let disconnectSubscription: any;
  let readInterval: any;
  let readSubscription: any;

  useEffect(() => {
    setTimeout(() => connect(), 0);

    return () => {
      uninitializeRead();
      if (connection) {
        disconnect();
      }
    };
  }, []);

  const connect = async () => {
    try {
      const connected = await device.connect();
      setConnection(connected);

      if (connected) {
        addData({
          data: 'Connected',
          timestamp: new Date(),
          type: 'info',
        });

        initializeRead();
      }
    } catch (error: any) {
      addData({
        data: `Connection failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }
  };

  const disconnect = async (disconnected?: boolean) => {
    try {
      if (!disconnected) {
        disconnected = await device.disconnect();
      }

      addData({
        data: 'Disconnected',
        timestamp: new Date(),
        type: 'info',
      });

      setConnection(!disconnected);
    } catch (error: any) {
      addData({
        data: `Disconnect failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }

    // Clear the reads, so that they don't get duplicated
    uninitializeRead();
  };

  const initializeRead = () => {
    disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() =>
      disconnect(true),
    );

    if (polling) {
      readInterval = setInterval(() => performRead(), 5000);
    } else {
      readSubscription = device.onDataReceived((data: any) =>
        onReceivedData(data),
      );
    }
  };

  const uninitializeRead = () => {
    if (readInterval) {
      clearInterval(readInterval);
    }
    if (readSubscription) {
      readSubscription.remove();
    }
  };

  const performRead = async () => {
    try {
      console.log('Polling for available messages');
      let available = await device.available();
      console.log(`There is data available [${available}], attempting read`);

      if (available > 0) {
        for (let i = 0; i < available; i++) {
          console.log(`reading ${i}th time`);
          let data = await device.read();

          console.log(`Read data ${data}`);
          console.log(data);
          onReceivedData({data});
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReceivedData = async (event: any & {data: Buffer}) => {
    console.log('data onReceived', event);
    //const msgHex = data.toString('hex');
    event.timestamp = new Date();
    addData({
      ...event,
      timestamp: new Date(),
      type: 'receive',
    });
  };

  const addData = (message: Message) => {
    setData([message, ...data]);
  };

  return (
    <View style={styles.container}>
      {connection && (
        <>
          <EqualizerGaia
            device={device}
            handleScrollEnabled={handleScrollEnabled}
          />
          {/* <EqualizerTest device={device} handleScrollEnabled={handleScrollEnabled} /> */}
          {/* <EqualizerJava device={device} handleScrollEnabled={handleScrollEnabled} /> */}
          {/* <EqualizerNew device={device} handleScrollEnabled={handleScrollEnabled} /> */}
          {/* <EqualizerSliders device={device} handleScrollEnabled={handleScrollEnabled} /> */}
          {/* <MasterGainControl device={device} handleScrollEnabled={handleScrollEnabled} /> */}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#007bff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
  },
  output: {
    flex: 1,
    paddingHorizontal: 8,
  },
  inputArea: {
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: '#ccc',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  inputAreaConnected: {
    flexDirection: 'row',
    alignContent: 'stretch',
    backgroundColor: '#90EE90',
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  inputAreaTextInput: {
    flex: 1,
    height: 40,
  },
  inputAreaSendButton: {
    justifyContent: 'center',
    flexShrink: 1,
  },
});

export default ConnectionScreen;
