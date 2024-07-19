import React, {
    createContext,
    useState,
    useEffect,
    useContext,
    ReactNode
} from 'react'
import {PermissionsAndroid, Platform} from 'react-native'
import RNBluetoothClassic, {
    BluetoothDevice
} from 'react-native-bluetooth-classic'

interface BluetoothContextType {
    searchingDevices: boolean
    devices: BluetoothDevice[]
    connectedDevice: BluetoothDevice | null
    scanDevices: () => Promise<void>
    connectToDevice: (device: BluetoothDevice) => Promise<void>
    pairToDevice: (device: BluetoothDevice) => Promise<void>
}

interface BluetoothProviderProps {
    children: ReactNode
}

const BluetoothContext = createContext<BluetoothContextType | undefined>(
    undefined
)

export const BluetoothProvider: React.FC<BluetoothProviderProps> = ({
    children
}) => {
    const [searchingDevices, setSearchingDevices] = useState(false)
    const [devices, setDevices] = useState<BluetoothDevice[]>([])
    const [connectedDevice, setConnectedDevice] =
        useState<BluetoothDevice | null>(null)

    useEffect(() => {
        if (Platform.OS === 'android') {
            requestBluetoothPermission()
        }
    }, [])

    const requestBluetoothPermission = async () => {
        try {
            await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            ])
        } catch (err) {
            console.warn(err)
        }
    }

    const scanDevices = async () => {
        try {
            setSearchingDevices(true)
            const unpairedDevices = await RNBluetoothClassic.startDiscovery()

            console.log('Unpaired devices', unpairedDevices)
            setDevices(unpairedDevices)
        } catch (error) {
            console.log('Error during discovery', error)
        } finally {
            setSearchingDevices(false)
        }
    }

    const connectToDevice = async (device: BluetoothDevice) => {
        try {
            const connected = await RNBluetoothClassic.connectToDevice(
                device.address
            )
            console.log('Connected to device', connected)
            setConnectedDevice(connected)
        } catch (error) {
            console.log('Error connecting to device', error)
        }
    }

    const pairToDevice = async (device: BluetoothDevice) => {
        try {
            const devicePaired = await RNBluetoothClassic.pairDevice(
                device.address
            )
            console.log('Paired to device', devicePaired)
            setConnectedDevice(devicePaired)
        } catch (error) {
            console.log('Error pairing to device', error)
        }
    }

    return (
        <BluetoothContext.Provider
            value={{
                searchingDevices,
                devices,
                connectedDevice,
                scanDevices,
                connectToDevice,
                pairToDevice
            }}>
            {children}
        </BluetoothContext.Provider>
    )
}

export const useBluetooth = (): BluetoothContextType => {
    const context = useContext(BluetoothContext)
    if (context === undefined) {
        throw new Error('useBluetooth must be used within a BluetoothProvider')
    }
    return context
}
