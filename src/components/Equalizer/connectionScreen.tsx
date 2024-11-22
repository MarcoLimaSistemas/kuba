import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import RNBluetoothClassic, { BluetoothDevice } from 'react-native-bluetooth-classic';
import { Buffer } from 'buffer';
import MasterGainControl from './MasterGainControl';

global.Buffer = global.Buffer || Buffer;


interface Message {
  timestamp: Date;
  data: string;
  type: 'receive' | 'sent' | 'info' | 'error';
}

interface ConnectionScreenProps {
  device: BluetoothDevice;
  handleScrollEnabled: (enabled: boolean) => void;
  onBack: () => void;
}

const ConnectionScreen: React.FC<ConnectionScreenProps> = ({ device, onBack,handleScrollEnabled  }) => {
  const [setText] = useState<string | undefined | Buffer>(undefined);
  const [data, setData] = useState<Message[]>([]);
  const [polling, setPolling] = useState(false);
  const [connection, setConnection] = useState(false);

  let disconnectSubscription: any;
  let readInterval: NodeJS.Timeout;
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
      let isConnected = await device.isConnected();
      if (!isConnected) {
        addData({
          data: `Attempting connection to ${device.address}`,
          timestamp: new Date(),
          type: 'error',
        });

        console.log('connectionOptions');
        isConnected = await device.connect();

        addData({
          data: 'Connection successful',
          timestamp: new Date(),
          type: 'info',
        });
      } else {
        addData({
          data: `Connected to ${device.address}`,
          timestamp: new Date(),
          type: 'error',
        });
      }

      setConnection(isConnected);
      initializeRead();
    } catch (error: any) {
      addData({
        data: `Connection failed: ${error.message}`,
        timestamp: new Date(),
        type: 'error',
      });
    }
  };

  const createGaiaMessage = (command: Buffer) => {
    sendData(command);

    return command;
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
    disconnectSubscription = RNBluetoothClassic.onDeviceDisconnected(() => disconnect(true));

    if (polling) {
      readInterval = setInterval(() => performRead(), 5000);
    } else {
      readSubscription = device.onDataReceived((data) => onReceivedData(data));
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
          onReceivedData({ data });
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onReceivedData = async (event: any & { data: Buffer }) => {
    console.log("data onReceived",event)
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

  const sendData = async (msg?: Buffer) => {
    try {
      if (!msg) return;

     await device.write(msg);
 console.log("msg",msg)
      const byteArray = Array.from(msg);
      const msgHex = msg.toString('hex');
 
      addData({
        timestamp: new Date(),
        data: `Byte array: ${msgHex}`,
        type: 'sent',
      });

      const response = await device.read();
      if (response) {
        const buffer = Buffer.from(response, "hex");
        const batteryPercentage = buffer
        console.log("batteryPercentage",batteryPercentage)
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {!connection && <MasterGainControl createGaiaMessage={createGaiaMessage} handleScrollEnabled={handleScrollEnabled}/>}

      {/* <FlatList
        style={styles.output}
        contentContainerStyle={{ justifyContent: 'flex-end' }}
        inverted
        data={data}
        keyExtractor={(item) => item.timestamp.toISOString()}
        renderItem={({ item }) => (
          <View
            id={item.timestamp.toISOString()}
            style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <Text style={{color:"#000"}}>{item.timestamp.toLocaleDateString()}</Text>
            <Text style={{color:"#000"}}>{item.type === 'sent' ? ' < ' : ' > '}</Text>
            <Text style={{ flexShrink: 1 ,color:"#000"}}>{item.data.trim()}</Text>
          </View>
        )}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
width:'100%',
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
