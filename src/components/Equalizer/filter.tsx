import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

import { Buffer } from 'buffer';
import RadioButton from '@components/RadioButton';
import { Button } from '@components/Button';
global.Buffer = global.Buffer || Buffer;

enum Filter {
  BYPASS,
  LOW_PASS_1,
  HIGH_SHELF_2,
}

interface FilterEqualizerScreenProps {
  createGaiaMessage: (command: Buffer) => void;
}

const MasterGainControl: React.FC<FilterEqualizerScreenProps> = ({ createGaiaMessage }) => {
  const [frequency, setFrequency] = useState<number>(0.3);
  const [gain, setGain] = useState<number>(-12);
  const [quality, setQuality] = useState<number>(0.25);

  const [minFrequency, setMinFrequency] = useState<number>(0.2);
  const [maxFrequency, setMaxFrequency] = useState<number>(20000);

  const [selectedOptionBand, setSelectedOptionBand] = useState<string | null>('1');
  const options = ['1', '2', '3', '4', '5'];

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.BYPASS);

  const handleSelect = (option: string) => {
    setSelectedOptionBand(option);
  };

  const formatFrequency = (value: number | null): string => {
    if (value === null) return "- Hz";
    if (value < 50) return `${value.toFixed(1)} Hz`;
    if (value < 1000) return `${value.toFixed(0)} Hz`;
    return `${(value / 1000).toFixed(1)} kHz`;
  };


  const generateCodeAndSendToGaia = (filterId: number, value: string) => {
    const code = `FF010005000A021A01${selectedOptionBand}${filterId}${value}01`;

    console.log("code", code)
    createGaiaMessage(Buffer.from(code, 'hex'));
  };

  const generateCodeForFrequency = (frequency: number) => {
    const filterId = 1;

    const multiply = frequency < 1 ? 100 : 1000;

    frequency *= multiply * 3;

    const valueFrequencyToHex = convertValueToHex(frequency);

    generateCodeAndSendToGaia(filterId, valueFrequencyToHex);
  };

  const convertQualityToHex = (quality: number): string => {
    quality *= 4096;
    return convertValueToHex(quality);
  };

  const generateCodeForGain = (gain: number) => {
    const filterId = 2; // Use o ID correto para ganho
    // Limitando o ganho dentro do intervalo permitido
    let clampedGain = Number((Math.max(-12, Math.min(12, gain)) * 60).toFixed());

    if (gain < 0) {
      clampedGain = 4096 + clampedGain;
    }
    // Calculando o valor em hexadecimal com base na relação de 60 dB por unidade
    const hexValue = clampedGain.toString(16).toUpperCase();
    console.log('clampedGain', clampedGain);
    // Adicionando o prefixo "0" para valores positivos, "F" para valores negativos
    const prefix = gain >= 0 ? '0' : 'F';

    // Concatenando o prefixo com o valor calculado em hexadecimal
    const valueGainHex = prefix + hexValue;

    generateCodeAndSendToGaia(filterId, valueGainHex);
  };

  const generateCodeForQuality = (quality: number) => {
    const filterId = 3; // Use o ID correto para qualidade

    const hexValue = convertQualityToHex(quality);
    generateCodeAndSendToGaia(filterId, hexValue);
  };

  const convertValueToHex = (decimalValue: number): string => {
    decimalValue = Number(decimalValue.toFixed());
    // Converte o valor decimal para hexadecimal
    const hexValue = decimalValue.toString(16).toUpperCase();
    // Garante que o valor tenha quatro dígitos
    return hexValue.padStart(4, '0');
  };
  
  const onPreset= (filter:Filter) => {
    setSelectedFilter(filter)
    switch (filter) {
      case Filter.BYPASS:
        setMinFrequency(0.2)
        setMaxFrequency(20000)
        setFrequency(0);
        setGain(0);
        setQuality(0);
        break;
      
      case Filter.LOW_PASS_1:
        // LOW_PASS_1: frequency from 0.3Hz to 20 kHz, no gain, no quality
        setMinFrequency(0.3)
        setMaxFrequency(20000)
        setFrequency(1.2);
        setGain(0);
        setQuality(0);
        break;

      case Filter.HIGH_SHELF_2:
        // HIGH_SHELF_2: frequency from 40Hz to 20kHz, gain from -12 dB to +12 dB, quality from 0.25 to 2.0
        setMinFrequency(0.4)
        setMinFrequency(20000)
        setFrequency(1.2);
        setGain(3);
        setQuality(8);
        break;

      default:
        break;
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{color:"#000"}}>Escolha uma opção de band:</Text>
      <RadioButton options={options} selectedOption={selectedOptionBand} onSelect={handleSelect} />

      <Button title="BYPASS" onPress={() => onPreset(Filter.BYPASS)} />
      <Button title="Low Pass 1" onPress={() => onPreset(Filter.LOW_PASS_1)} />
      <Button title="High Shelf 2" onPress={() => onPreset(Filter.HIGH_SHELF_2)} />

      <Text style={{color:"#000"}}> Filter: {selectedFilter} </Text>

      <Text style={{color:"#000"}}>Frequência: {formatFrequency(frequency)}</Text>
      <Slider
        style={{ width: '100%', marginVertical: 10 }}
        minimumValue={minFrequency}
        maximumValue={maxFrequency} 
        value={frequency}
        onValueChange={(value) => setFrequency(value)}
        onSlidingComplete={generateCodeForFrequency}
        step={0.1}
      />

      <Text style={{color:"#000"}}>Ganho: {gain} dB</Text>
      <Slider
        style={{ width: '100%', marginVertical: 10 }}
        minimumValue={-12}
        maximumValue={12}
        value={gain}
        onValueChange={(value) => setGain(value)}
        onSlidingComplete={generateCodeForGain}
      />

      <Text style={{color:"#000"}}>Qualidade: {quality}</Text>
      <Slider
        style={{ width: '100%', marginVertical: 10 }}
        minimumValue={0.25}
        maximumValue={8}
        value={quality}
        onValueChange={(value) => setQuality(value)}
        onSlidingComplete={generateCodeForQuality}
      />
    </View>
  );
};

export default MasterGainControl;
