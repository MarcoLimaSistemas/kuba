import { create } from 'zustand';

interface IValuesEqualizer {
  frequency:number, 
  setFrequency:(frequency:number)=>void,
  gain:number, 
  setGain:(gain:number)=>void,
  quality:number, 
  setQuality:(quality:number)=>void
  selectedOptionBand:string|null, 
  setSelectedOptionBand:(band:string|null)=>void

}

export const useValuesEqualizer = create<IValuesEqualizer>((set) => ({
  frequency: 570,
  gain:0,
  quality:0.25,
  selectedOptionBand:"1",
  
  setFrequency: (frequency:number) => {
    set(() => ({ frequency }));
  },
  setGain: (gain:number) => {
    set(() => ({ gain }));
  },
  setQuality: (quality:number) => {
    set(() => ({ quality }));
  },
  setSelectedOptionBand: (band:string|null) => {
    set(() => ({  selectedOptionBand:band }));
  },

}));
