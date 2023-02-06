import { useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import { BleManager, Device } from "react-native-ble-plx"
import { PERMISSIONS, requestMultiple } from "react-native-permissions"

import DeviceInfo from 'react-native-device-info'

import Toast from "react-native-toast-message"

type PermissionCallback = (result: boolean) => void

const bleManager = new BleManager()

interface BluetoothLowEnergyApi {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  onStopSearch: boolean
  setStopSearch: React.Dispatch<React.SetStateAction<boolean>>
  allDevices: Device[]

  requestPermissions(callback: PermissionCallback): Promise<void>
  onScanDevices(): void
  onStopScan(): void
  connectToDevice(device: Device): Promise<void>
}
export default function useBLE(): BluetoothLowEnergyApi {
  const [modalVisible, setModalVisible] = useState(false)
  const [onStopSearch, setStopSearch] = useState(false)

  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null)

  const [allDevices, setAllDevices] = useState<Device[]>([])

  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const apiLevel = await DeviceInfo.getApiLevel()
      if (apiLevel < 31) {
        const grantedStatus = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Permissão de localização",
            message: "Bluetooth de baixa energia precisa de permissão de localização",
            buttonPositive: "Ok",
            buttonNegative: "Cancelar",
            buttonNeutral: "Talvez mais tarde",
          }
        )
        callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED)
      } else {
        const result = await requestMultiple([
          PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
          PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ])

        const isAllPermissions =
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED

        callback(isAllPermissions)
      }
    } else {
      callback(true)
    }
  }

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1

  const onScanDevices = () => {
    setModalVisible(true)

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log("Erro ao procurar dispositivos", error)

        if (error.message === 'BluetoothLE is powered off') {
          Toast.show({
            type: 'error',
            text1: 'Falha',
            text2: 'O Bluetooth está desligado',
          })
        }
      }
      if (device) {
        console.log("Dispositivo encontrado", device.id)

        setAllDevices((prevState) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device]
          }
          return prevState
        })
      }
    })
  }

  const onStopScan = () => {
    try {
      const stopScan = bleManager.stopDeviceScan()
      console.log(stopScan)
    } catch (error: any) {
      console.log("Erro ao parar a busca por dispositivos", error.message)
    }
  }

  const connectToDevice = async (device: Device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id)
      setConnectedDevice(deviceConnection)
      bleManager.stopDeviceScan()
    } catch (error: any) {
      console.log("Erro ao conectar ao dispositivo", error.message)
    }
  }


  return {
    modalVisible,
    setModalVisible,
    onStopSearch,
    setStopSearch,
    allDevices,
    requestPermissions,
    onScanDevices,
    onStopScan,
    connectToDevice
  }
}