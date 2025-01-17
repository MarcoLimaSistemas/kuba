import * as S from './styles';
import React, { useState } from 'react';
import Text from '@components/Text';
import RadioButton from '@components/RadioButton';
import { GestureResponderEvent, } from 'react-native';
import VerticalSlider from '@components/Slider';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import { Spacer } from '@components/Spacer';
import { IBand, ISelectBand } from '@models/band';






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
    setIsModalSelectValueVisible,
    bands,
    setBands,
    setSelectedBand,
    selectedBand,
    setModalValue
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

  const handleOpenModalGainSelectValue = (item: ISelectBand) => {
    setSelectedBand(item)
    setIsModalSelectValueVisible(true)
  }

  const handleOpenModalQualitySelectValue = (item: ISelectBand) => {
    setSelectedBand(item)
    //setModalValue(parseFloat(item.value))
    setIsModalSelectValueVisible(true)
  }
 const  onSlidingCompleteGain = (newValue:number,) =>{

 }

 const onValueChangeGainVertical = (newValue:number,id:number) =>{
  setSelectedBand({ id: id, type: "gain", value: String(newValue)})
  if (selectedBand) {
    if(selectedBand.type === 'quality'){
      const newArray = bands?.map((item) =>
        item.id === selectedBand.id  ? { ...item, quality: newValue } : item) as IBand[];
      setBands(newArray)
      return 
    }
    if(selectedBand.type === 'gain'){
      const newArray = bands?.map((item) =>
        item.id === selectedBand.id  ? { ...item, gain: newValue } : item) as IBand[];
      setBands(newArray)
      return 
    }

  }
 }

  return (
    <S.Container>

      <S.ContainerEqualizer>
        <S.ContainerRow horizontal
          showsHorizontalScrollIndicator={false} >
          {bands?.map((item) => (
            <S.SliderContainer key={item.id}>
              <S.ContainerBars onPress={() => handleOpenModalGainSelectValue({ id: item.id, type: "gain", value: item.gain })} >
                <Text color='black' fontSize={14}>{item.gain !== "undefined" ? parseFloat(item.gain)?.toFixed(1) ?? 0 : 0}</Text>
                {/* <Text color='black'>{frequency ? formatFrequency(parseFloat(frequency)) : "20 Hz"}</Text>
     <Text color='black'>{parseFloat(quality)?.toFixed(2)}</Text> */}
              </S.ContainerBars>


              <S.ContainerBar>
                <VerticalSlider
                  disabled={disabled}
                  disabledSlider={disabledGain}
                  min={-10}
                  max={10}
                  value={parseFloat(gain)}
                  onValueChange={(value)=>onValueChangeGainVertical(value,item.id)}
                  onSlidingComplete={onSlidingCompleteGain}
                //  onSlidingComplete ={generateCodeForGain}
                  onTouchStart={onTouchStart}
                  onTouchEnd={onTouchEnd}
                  step={0.01}
                />
              </S.ContainerBar>
              <S.ContainerInputs>
                <S.ContainerBar>
                  <Text color='#777777' variant='bold' fontSize={12}>Freq.</Text>
                  <S.Circle>

                    <Text color='black' variant='bold' fontSize={12}>{item.label}</Text>
                  </S.Circle>
                  {/* <S.Input
                    keyboardType='number-pad'
                    placeholder=""
                    placeholderTextColor={'#000'}
                    value={frequency}
                    onChangeText={handleInputChangeFrequency}
                  /> */}
                  <Spacer h={10} />
                  <Text color='#777777' variant='bold' fontSize={12}>Q.</Text>
                  <S.ButtonCircle onPress={() => handleOpenModalQualitySelectValue({ id: item.id, type: "quality", value: item.quality })}>
                    <Text color='black' variant='bold' fontSize={12}>{parseFloat(item.quality)?.toFixed(2)}</Text>
                  </S.ButtonCircle>

                  {/* <S.Input
                    keyboardType='number-pad'
                    placeholder=""
                    placeholderTextColor={'#A0A0A0'}
                    value={quality}
                    onChangeText={handleInputChangeQuality}
                  /> */}
                </S.ContainerBar>
              </S.ContainerInputs>
            </S.SliderContainer>

          ))}
        </S.ContainerRow>



        <S.ContainerInputs>

          {/* <S.ContainerBar>

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
          </S.ContainerBar> */}


          {/* <S.ContainerBar>
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
          </S.ContainerBar> */}




          {/* <S.ContainerBar>
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
          </S.ContainerBar> */}

        </S.ContainerInputs>
      </S.ContainerEqualizer>



    </S.Container>
  )
}
export default EqualizerVisual


