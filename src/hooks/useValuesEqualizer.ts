import { Dispatch } from 'react';
import { ValueType } from 'react-native-dropdown-picker';
import { create } from 'zustand';

interface IValuesEqualizer {
  frequency:string, 
  setFrequency:(frequency:string)=>void,
  gain:string, 
  setGain:(gain:string)=>void,
  quality:string, 
  setQuality:(quality:string)=>void
  selectedOptionBand:string|null, 
  setSelectedOptionBand:(band:string|null)=>void,
  currentPresetId:ValueType | null,
 setCurrentPresetId:Dispatch<React.SetStateAction<ValueType | null>>
}

export const useValuesEqualizer = create<IValuesEqualizer>((set) => ({
  frequency: "570",
  gain:"0",
  quality:"0.25",
  selectedOptionBand:"1",
  currentPresetId:null,
  
  setFrequency: (frequency:string) => {
    set(() => ({ frequency }));
  },
  setGain: (gain:string) => {
    set(() => ({ gain }));
  },
  setQuality: (quality:string) => {
    set(() => ({ quality }));
  },
  setSelectedOptionBand: (band:string|null) => {
    set(() => ({  selectedOptionBand:band }));
  },
  setCurrentPresetId: (preset) => 
    set((state) => ({
      currentPresetId: typeof preset === 'function' 
        ? (preset as (prev: ValueType | null) => ValueType | null)(state.currentPresetId) 
        : preset,
    })),

}));
