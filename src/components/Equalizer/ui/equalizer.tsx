import * as S from './styles';
import React from 'react';
import Text from '@components/Text';
import RadioButton from '@components/RadioButton';
import { GestureResponderEvent, } from 'react-native';
import VerticalSlider from '@components/Slider';

import { useValuesEqualizer } from '@hooks/useValuesEqualizer';





interface IEqualizerVisualProps {
  frequency: number;
  gain: number,
  quality: number,
  optionBand: string | null,
  minFrequency: number,
  maxFrequency: number
  disabled?: boolean;
  disabledFrequency: boolean,
  disabledGain: boolean,
  disabledQuality: boolean,
  onSelect: (option: string) => void
  generateCodeForFrequency?: (frequency: number) => void;
  generateCodeForGain?: (gain: number) => void;
  generateCodeForQuality?: (quality: number) => void;
  onValueChangeFrequency?: (value: number) => void;
  onValueChangeGain?: (value: number) => void;
  onValueChangeQuality?: (value: number) => void;
  onTouchStart?: ((event: GestureResponderEvent) => void) | undefined;
  onTouchEnd?: ((event: GestureResponderEvent) => void) | undefined;
}

const EqualizerVisual: React.FC<IEqualizerVisualProps> = (
  {
    // frequency,
    // gain,
    // quality,
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
  }) => {
  const options = ['1', '2', '3', '4', '5'];
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


  const formatFrequency = (value: number | null): string => {
    if (value === null) return "- Hz";
    if (value < 50) return `${value.toFixed(1)} Hz`;
    if (value < 1000) return `${value.toFixed(0)} Hz`;
    return `${(value / 1000).toFixed(1)} kHz`;
  };

  const formatFrequencyInput = (value: number | null): string => {
    if (value === null) return "";
    if (value < 50) return `${value.toFixed(1)} `;
    if (value < 1000) return `${value.toFixed(0)} `;
    return `${(value / 1000).toFixed(1)}`;
  };


  const logMinFrequency = Math.log10(minFrequency);
  const logMaxFrequency = Math.log10(maxFrequency);

  const logMinQuality = Math.log10(0.25);
  const logMaxQuality = Math.log10(8);




  const convertLinearScaleFrequency = (logValue: number) => {
    const result = (Math.log10(logValue) - logMinFrequency) / (logMaxFrequency - logMinFrequency);
    return Math.max(0, Math.min(result, 1));
  }

  const convertLinearScaleQuality = (logValue: number) => {
    const result = (Math.log10(logValue) - logMinQuality) / (logMaxQuality - logMinQuality);
    return Math.max(0, Math.min(result, 1));
  }


  const handleSliderChange = (newValue: number) => {
    setFrequency(newValue.toFixed(2));
  };

  const handleInputChangeFrequency = (text: string) => {
    if (/^-?\d*(\.\d{0,2})?$/.test(text)) {
      setFrequency(text);
    } else if (text === "") {
      setFrequency("0");
    }


  };
  const handleInputChangeQuality = (text: string) => {
    const validText = text.match(/^-?\d*\.?\d{0,1}$/);
    if (!validText) return;

    const numericValue = parseFloat(text);

    if (text === '' || text === '-') {
      setQuality(text);
      return;
    }

    if (numericValue >= 0.25 && numericValue <= 8) {
      setQuality(text);
    }

  }

  const handleInputChangeGain = (text: string) => {
    const validText = text.match(/^-?\d*\.?\d{0,1}$/);
    if (!validText) return;

    const numericValue = parseFloat(text);

    if (text === '' || text === '-') {
      setGain(text);
      return;
    }

    if (numericValue >= -10 && numericValue <= 10) {
      setGain(text);
    }

  };



  return (
    <S.Container>

      <Text style={{ color: "#000" }}>Escolha uma opção de band</Text>

      <RadioButton
        options={options}
        selectedOption={optionBand}
        onSelect={onSelect}
        disabled={disabled}
      />

      <S.ContainerEqualizer>


        {/* <S.ContainerSlider>



          <Text color='black'>Frequência: {formatFrequency(frequency)}</Text>

          <Slider
            disabled={disabled}
            style={{ width: '100%', marginVertical: 12, height: 50 }}
            minimumValue={0}
            maximumValue={1}
            value={convertLinearScaleFrequency(frequency)}
            onValueChange={onValueChangeFrequency}
            onSlidingComplete={generateCodeForFrequency}
            minimumTrackTintColor="#242424"
            maximumTrackTintColor="#656565"
            thumbTintColor={disabledFrequency ? '#d7d7d7' : '#242424'}
            step={0.00001}
          />

        </S.ContainerSlider>

        <S.ContainerSlider>
          <Text color='black'>Qualidade: {quality?.toFixed(2)}</Text>
          <Slider
            disabled={disabled}
            style={{ width: '100%', marginVertical: 12, height: 50 }}
            minimumValue={0}
            maximumValue={1}
            value={convertLinearScaleQuality(quality)}
            onValueChange={onValueChangeQuality}
            onSlidingComplete={generateCodeForQuality}
            minimumTrackTintColor="#242424"
            maximumTrackTintColor="#656565"
            thumbTintColor={disabledQuality ? '#d7d7d7' : '#242424'}
            step={0.001}
          />
        </S.ContainerSlider>

        <S.ContainerSlider>
          <Text color='black'>Ganho: {gain?.toFixed(1) ?? 0} dB</Text>


          <Slider
            disabled={disabled}
            style={{ width: '100%', marginVertical: 12, height: 50 }}
            minimumValue={-10}
            maximumValue={10}
            value={(gain)}
            onValueChange={onValueChangeGain}
            onSlidingComplete={generateCodeForGain}
            minimumTrackTintColor="#242424"
            maximumTrackTintColor="#656565"
            thumbTintColor={disabledGain ? '#d7d7d7' : '#242424'}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            step={0.01}
          />
        </S.ContainerSlider>  */}




        <S.ContainerBars>
          <Text color='black'>{frequency ? formatFrequency(parseFloat(frequency)) : "20 Hz"}</Text>
          <Text color='black'>{parseFloat(quality)?.toFixed(2)}</Text>
          <Text color='black'>{gain !== "undefined" ? parseFloat(gain)?.toFixed(1) ?? 0 : 0} dB</Text>
        </S.ContainerBars>

        <S.ContainerBars>
          <S.ContainerBar>

            <VerticalSlider
              disabled={disabled}
              disabledSlider={disabledFrequency}
              min={0}
              max={1}
              value={convertLinearScaleFrequency(parseFloat(frequency))}
              onValueChange={onValueChangeFrequency}
              onSlidingComplete={generateCodeForFrequency}
              step={0.00001}
            />
          </S.ContainerBar>


          <S.ContainerBar>
            <VerticalSlider
              disabled={disabled}
              disabledSlider={disabledQuality}
              min={0}
              max={1}
              value={convertLinearScaleQuality(parseFloat(quality))}
              onValueChange={onValueChangeQuality}
              onSlidingComplete={generateCodeForQuality}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              step={0.001}
            />
          </S.ContainerBar>


          <S.ContainerBar>
            <VerticalSlider
              disabled={disabled}
              disabledSlider={disabledGain}
              min={-10}
              max={10}
              value={parseFloat(gain)}
              onValueChange={onValueChangeGain}
              onSlidingComplete={generateCodeForGain}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              step={0.01}
            />
          </S.ContainerBar>
        </S.ContainerBars>

        <S.ContainerInputs>
          <S.ContainerBar>
            <Text color='#777777' variant='bold'>Freq.</Text>
            <S.Input
              keyboardType='number-pad'
              placeholder=""
              placeholderTextColor={'#000'}
              value={frequency}
              onChangeText={handleInputChangeFrequency}
            />
          </S.ContainerBar>

          <S.ContainerBar>
            <Text color='#777777' variant='bold'>Q.</Text>
            <S.Input
              keyboardType='number-pad'
              placeholder=""
              placeholderTextColor={'#A0A0A0'}
              value={quality}
              onChangeText={handleInputChangeQuality}
            />
          </S.ContainerBar>

          <S.ContainerBar>
            <Text color='#777777' variant='bold'>G.</Text>
            <S.Input
              keyboardType='number-pad'
              placeholder=""
              placeholderTextColor={'#A0A0A0'}
              maxLength={6}
              value={gain}
              onChangeText={handleInputChangeGain}
            />
          </S.ContainerBar>

        </S.ContainerInputs>
      </S.ContainerEqualizer>



    </S.Container>
  )
}
export default EqualizerVisual


