import React, { useState } from 'react';
import * as S from './styles';

// import Slider from '@react-native-community/slider';
// import RadioButton from '@components/RadioButton';
import { Button } from '@components/Button';
// import { Text } from '@components/Text/styles';
import { Buffer } from 'buffer';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import EqualizerVisual from '../ui/equalizer';

global.Buffer = global.Buffer || Buffer;

enum Filter {
  BYPASS,
  LOW_PASS_1,
  HIGH_SHELF_2,
}

interface FilterEqualizerScreenProps {
  createGaiaMessage: (command: Buffer) => void;
  handleScrollEnabled: (enabled: boolean) => void;
}

const MasterGainControl: React.FC<FilterEqualizerScreenProps> = ({ createGaiaMessage, handleScrollEnabled }) => {

  const {
    frequency,
    setFrequency,
    gain,
    setGain,
    quality,
    setQuality,
    selectedOptionBand,
    setSelectedOptionBand,
  } = useValuesEqualizer()
  const [minFrequency, setMinFrequency] = useState<number>(20);
  const [maxFrequency, setMaxFrequency] = useState<number>(20000);

  const logMinFrequency = Math.log10(minFrequency);
  const logMaxFrequency = Math.log10(maxFrequency);

  const logMinQuality = Math.log10(0.25);
  const logMaxQuality = Math.log10(8);

  // Converts the linear value (0 to 1) to logarithmic in the real range
  const convertLogScaleFrequency = (linearValue: number) => {
    const result = Math.pow(10, linearValue * (logMaxFrequency - logMinFrequency) + logMinFrequency);
    return parseFloat(result.toFixed(1));
  }

  const convertLogScaleQuality = (linearValue: number) =>
    Math.pow(10, linearValue * (logMaxQuality - logMinQuality) + logMinQuality);



  const [] = useState<string | null>('');


  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.BYPASS);

  const disabledFrequency = frequency === 0
  const disabledGain = gain === 0
  const disabledQuality = quality === 0




  const handleSelect = (option: string) => {
    setSelectedOptionBand(option);
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

  const onPreset = (filter: Filter) => {
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


  const generateBass = () => {
    const code = "FF010100000A0218F4";


    createGaiaMessage(Buffer.from(code, 'hex'));
  };

  const getBatteryLevel = async () => {
    const code = "FF010100000A0300F3";


    createGaiaMessage(Buffer.from(code, 'hex'));
  };

  return (
    <S.Container>

      {/* <Button title="BYPASS" onPress={() => onPreset(Filter.BYPASS)} />
      <Button title="Low Pass 1" onPress={() => onPreset(Filter.LOW_PASS_1)} />
      <Button title="High Shelf 2" onPress={() => onPreset(Filter.HIGH_SHELF_2)} />

      <Text color='black'> Filter: {selectedFilter} </Text> */}
      {/*       
      <Button title="GET_BATTERY" onPress={getBatteryLevel} />
       <Button title="Bass" onPress={generateBass} /> */}

      <EqualizerVisual
        frequency={frequency}
        quality={quality}
        gain={gain}
        maxFrequency={maxFrequency}
        minFrequency={minFrequency}
        optionBand={selectedOptionBand}
        disabledFrequency={disabledFrequency}
        disabledQuality={disabledQuality}
        disabledGain={disabledGain}
        onSelect={handleSelect}
        generateCodeForFrequency={generateCodeForFrequency}
        generateCodeForQuality={generateCodeForQuality}
        generateCodeForGain={generateCodeForGain}
        onValueChangeFrequency={(value) => setFrequency(convertLogScaleFrequency(value))}
        onValueChangeQuality={(value) => setQuality(convertLogScaleQuality(value))}
        onValueChangeGain={(value) => setGain((value))}
        onTouchStart={() => handleScrollEnabled(false)}
        onTouchEnd={() => handleScrollEnabled(true)}
      />

    </S.Container>
  );
};

export default MasterGainControl;
