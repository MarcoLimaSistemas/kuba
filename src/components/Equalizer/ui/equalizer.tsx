import Slider from '@react-native-community/slider';
import * as S from './styles';
import React from 'react';
import Text from '@components/Text';
import RadioButton from '@components/RadioButton';
import { GestureResponderEvent } from 'react-native';


interface IEqualizerVisualProps {
  frequency:number;
  gain:number, 
  quality:number, 
  optionBand:string|null,
  minFrequency:number,
  maxFrequency:number
  disabled?:boolean;
  disabledFrequency:boolean,
  disabledGain:boolean,
  disabledQuality:boolean,
  onSelect: (option: string) => void
  generateCodeForFrequency?: (frequency: number) => void;
  generateCodeForGain?: (gain: number)=> void;
  generateCodeForQuality?: (quality: number) =>void;
  onValueChangeFrequency?: (value: number) => void;
  onValueChangeGain?: (value: number) => void;
  onValueChangeQuality?: (value: number) => void;
  onTouchStart?: ((event: GestureResponderEvent) => void) | undefined;
  onTouchEnd?:((event: GestureResponderEvent) => void) | undefined;
}

const EqualizerVisual: React.FC<IEqualizerVisualProps> = (
  {
  frequency,
  gain, 
  quality,
  optionBand,
  maxFrequency,
  minFrequency,
  disabled,
  disabledFrequency,
  disabledGain,
  disabledQuality,
  onSelect,
  generateCodeForFrequency,
  generateCodeForGain, 
  generateCodeForQuality,
  onValueChangeFrequency, 
  onValueChangeGain,
  onValueChangeQuality,
  onTouchEnd,
  onTouchStart
})=>{
  const options = ['1', '2', '3', '4', '5'];

  const formatFrequency = (value: number | null): string => {
    if (value === null) return "- Hz";
    if (value < 50) return `${value.toFixed(1)} Hz`;
    if (value < 1000) return `${value.toFixed(0)} Hz`;
    return `${(value / 1000).toFixed(1)} kHz`;
  };

  return(
    <S.Container>

  <Text style={{color:"#000"}}>Escolha uma opção de band</Text>

    <RadioButton
    options={options} 
    selectedOption={optionBand} 
    onSelect={onSelect} 
    disabled={disabled}
    /> 
    <S.ContainerEqualizer>
 


    <S.ContainerSlider>
    <Text color='black'>Frequência: {formatFrequency(frequency)}</Text>
 
    <Slider
      disabled={disabled}
      style={{ width: '100%', marginVertical: 12,	height: 50 }}
      minimumValue={minFrequency}
      maximumValue={maxFrequency} 
      value={frequency}
      onValueChange={onValueChangeFrequency}
      onSlidingComplete={generateCodeForFrequency}
      minimumTrackTintColor="#242424" 
      maximumTrackTintColor="#656565"
      thumbTintColor={disabledFrequency  ? '#d7d7d7' : '#242424'}
      step={0.1}
     
    />

 
    </S.ContainerSlider>

    <S.ContainerSlider>
    <Text color='black'>Ganho: {gain.toFixed(2)} dB</Text>
    <Slider
     disabled={disabled}
      style={{ width: '100%', marginVertical: 12,	height: 50 }}
      minimumValue={-12}
      maximumValue={12}
      value={gain}
      onValueChange={onValueChangeGain}
      onSlidingComplete={generateCodeForGain}
      minimumTrackTintColor="#242424" 
      maximumTrackTintColor="#656565"
      thumbTintColor={disabledGain  ? '#d7d7d7' : '#242424'}
      onTouchStart={onTouchStart} 
      onTouchEnd={onTouchEnd} 

    />
    </S.ContainerSlider>

    <S.ContainerSlider>
    <Text color='black'>Qualidade: {quality.toFixed(2)}</Text>
    <Slider
     disabled={disabled}
      style={{ width: '100%', marginVertical: 12,	height: 50 }}
      minimumValue={0.25}
      maximumValue={8}
      value={quality}
      onValueChange={onValueChangeQuality}
      onSlidingComplete={generateCodeForQuality}
      minimumTrackTintColor="#242424" 
      maximumTrackTintColor="#656565"
      thumbTintColor={disabledQuality  ? '#d7d7d7' : '#242424'}

    />
    </S.ContainerSlider>
    </S.ContainerEqualizer>
    </S.Container>
  )
}
export default  EqualizerVisual