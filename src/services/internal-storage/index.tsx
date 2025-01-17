import { STORAGE_PRESET } from "@config/storage";
import { IPresetUser } from "@models/band";

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getDataPresets() {
  try {
    const preset = await AsyncStorage.getItem(STORAGE_PRESET);
    return preset ? JSON.parse(preset) as  IPresetUser[] : [];

  } catch (error: any) {
    console.error('Error', error);
    return [];
  }

}
export async function updatePresetInternal(data: IPresetUser[]){
	await AsyncStorage.setItem(STORAGE_PRESET,JSON.stringify(data))
}

export const deletePresetInternal = async (id: number) => {
  try {
    const existingData = await AsyncStorage.getItem(STORAGE_PRESET);
    const parsedData = existingData ? JSON.parse(existingData) : [];

    const updatedData = parsedData.filter((item: any) => item.id !== id);

   await AsyncStorage.setItem(STORAGE_PRESET, JSON.stringify(updatedData));
  } catch (error) {
    console.error('Erro ao deletar dados:', error);
  }
};