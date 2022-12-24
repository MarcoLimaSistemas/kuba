import { useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import { BleManager, Device } from "react-native-ble-plx"

type PermissionCallback = (result: boolean) => void

const bleManager = new BleManager()

interface BluetoothLowEnergyApi {
  requestPermissions(callback: PermissionCallback): Promise<void>
  scanForDevices(): void
  allDevices: Device[]
}

export default function useBLE(): BluetoothLowEnergyApi {
  const [allDevices, setAllDevices] = useState<Device[]>([])

  const requestPermissions = async (callback: PermissionCallback) => {
    if (Platform.OS === 'android') {
      const grantedStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location permission",
          message: "Bluetooh Low Energy Needs Location Permission",
          buttonPositive: "Ok",
          buttonNegative: "Cancel",
          buttonNeutral: "Maybe Later",
        }
      )
      callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED)
    } else {
      callback(true)
    }
  }

  const isDuplicateDevice = (devices: Device[], nextDevice: Device) =>
    devices.findIndex(device => nextDevice.id === device.id) > -1

  const scanForDevices = () => {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error)
      }
      if (device && device.name?.includes('CorSense')) {
        // ADD DEVICE
        setAllDevices((prevState) => {
          if (!isDuplicateDevice(prevState, device)) {
            return [...prevState, device]
          }

          return prevState
        })
      }
    })
  }

  return {
    requestPermissions,
    scanForDevices,
    allDevices
  }
}