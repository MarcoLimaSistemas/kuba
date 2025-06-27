
import { IBand, IBandSettings, ISelectBand } from '@models/band';
import {  bandsSettingsMock, initialBands } from '@screens/Client/HomeScreen/initialDate';
import { Dispatch } from 'react';
import { ValueType } from 'react-native-dropdown-picker';
import { create } from 'zustand';




interface IValuesEqualizer {
  frequency: string,
  setFrequency: (frequency: string) => void,
  gain: string,
  setGain: (gain: string) => void,
  quality: string,
  setQuality: (quality: string) => void
  selectedOptionBand: string | null,
  setSelectedOptionBand: (band: string | null) => void,
  currentPresetId: ValueType | null,
  setCurrentPresetId: Dispatch<React.SetStateAction<ValueType | null>>

  isModalSelectValueVisible: boolean,
  setIsModalSelectValueVisible: (value: boolean) => void,
  selectedBand: ISelectBand | null
  setSelectedBand: (value: ISelectBand | null) => void,
  bands: IBand[],
  setBands: (value: IBand[]) => void,
  modalValue: number
  setModalValue: (item: number) => void

  settings: IBandSettings[],
  setSettings: (value: IBandSettings[]) => void,
}


export const useValuesEqualizer = create<IValuesEqualizer>((set) => ({
  frequency: '570',
  gain: '0',
  quality: '0.25',
  selectedOptionBand: '1',
  currentPresetId: null,
  isModalSelectValueVisible: false,
  selectedBand: null,
  bands: initialBands,
  modalValue: 0,
  settings:bandsSettingsMock.map((band) => ({
    id:band.id,
    label:band.label,
    frequency: band.frequency,
    gain: 0,
    quality: 1.0,
  })),

  setFrequency: (frequency: string) => {
    set(() => ({ frequency }));
  },
  setGain: (gain: string) => {
    set(() => ({ gain }));
  },
  setQuality: (quality: string) => {
    set(() => ({ quality }));
  },
  setSelectedOptionBand: (band: string | null) => {
    set(() => ({ selectedOptionBand: band }));
  },
  setCurrentPresetId: (preset) =>
    set((state) => ({
      currentPresetId: typeof preset === 'function'
        ? (preset as (prev: ValueType | null) => ValueType | null)(state.currentPresetId)
        : preset,
    })),
  setIsModalSelectValueVisible: (value: boolean) => {
    set(() => ({ isModalSelectValueVisible: value }));
  },
  setSelectedBand: (value: ISelectBand | null) => {
    set(() => ({ selectedBand: value }));
  },
  setBands: (value: IBand[]) => {
    set(() => ({ bands: value }));
  },
  setModalValue: (item: number) => {
    set(() => ({ modalValue: item }));
  },
  setSettings: (value: IBandSettings[]) => {
    set(() => ({ settings: value }));
  },


}));
