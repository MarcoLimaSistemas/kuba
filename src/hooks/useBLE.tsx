import { useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import { BleError, BleManager, Device } from "react-native-ble-plx"
import { PERMISSIONS, requestMultiple } from "react-native-permissions"

import DeviceInfo from 'react-native-device-info'

import Toast from "react-native-toast-message"

type PermissionCallback = (result: boolean) => void

const bleManager = new BleManager()

interface BluetoothLowEnergyApi {
  modalVisible: boolean
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  allDevices: Device[]

  requestPermissions(callback: PermissionCallback): Promise<void>
  onScanDevices(): void
  onStopScan(): void
}
export default function useBLE(): BluetoothLowEnergyApi {
  const [modalVisible, setModalVisible] = useState(false)

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

  async function onScanDevices() {
    setModalVisible(true)

    bleManager.startDeviceScan(null, null, (error: BleError | null, scannedDevice: Device | null) => {
      if (error) {
        setModalVisible(false)

        console.log(error.message)
        if (error.message === 'BluetoothLE is powered off') {
          Toast.show({
            type: 'error',
            text1: 'Falha',
            text2: 'O Bluetooth está desligado',
          })
        }
      } else {
        if (scannedDevice) {
          // ADD DEVICE SCANNED DEVICE
          setAllDevices((prevState) => {
            if (!isDuplicateDevice(prevState, scannedDevice)) {
              return [...prevState, scannedDevice]
            }
            return prevState
          })
        }
        console.log(allDevices)
      }
    })
  }

  async function onStopScan() {
    bleManager.stopDeviceScan()
  }

  return {
    modalVisible,
    setModalVisible,
    allDevices,
    requestPermissions,
    onScanDevices,
    onStopScan,
  }
}