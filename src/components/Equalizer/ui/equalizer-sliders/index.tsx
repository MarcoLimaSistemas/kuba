import * as S from './styles';
import React, { useEffect} from 'react';
import Text from '@components/Text';
import { DeviceEventEmitter, GestureResponderEvent, } from 'react-native';
import VerticalSlider from '@components/Slider';
import { useValuesEqualizer } from '@hooks/useValuesEqualizer';
import { Spacer } from '@components/Spacer';
import { bandsSettingsMock } from '@screens/Client/HomeScreen/initialDate';




interface IEqualizerSlidersProps {
  createGaiaMessage: (command: Buffer) => void;
  handleScrollEnabled: (enabled: boolean) => void;
}


const EqualizerSliders: React.FC<IEqualizerSlidersProps> = (
  {
    createGaiaMessage,
    handleScrollEnabled
  }) => {
  const disabled = false
  const disabledGain = false
  const {
    frequency,
    gain,
    quality,
    setIsModalSelectValueVisible,
    setSelectedBand,
    selectedBand,
    settings,
    setSettings
  } = useValuesEqualizer()






  const sendEQParameter = (bandId: number, parameter: "frequency" | "gain" | "quality", value: number) => {
    try {
      let parameterType;
      let scaledValue;

      if (parameter === "gain") {
        parameterType = 0x02;
        scaledValue = Math.round(value * 250);
        if (scaledValue < 0) scaledValue = 0x1000 + scaledValue;
      } else if (parameter === "quality") {
        parameterType = 0x03;
        scaledValue = Math.round(value * 4096);
      } else if (parameter === "frequency") {
        parameterType = 0x01;
        scaledValue = Math.round(value * 1000);
      } else {
        throw new Error("Invalid parameter type");
      }

      // Create parameter ID by combining band ID and parameter type
      const parameterId = (bandId << 4) | parameterType;

      const command = Buffer.from([
        0xFF, 0x01, 0x00, 0x05, // Header
        0x00, 0x0A, // Vendor ID
        0x02, 0x1A, // Command ID (Set EQ Parameter)
        0x01, // Bank ID
        parameterId, // Band + Parameter
        (scaledValue >> 8) & 0xFF, // Value MSB
        scaledValue & 0xFF, // Value LSB
        0x01, // Bank Activation
      ]);

      console.log(`Band ${bandId} - ${parameter.toUpperCase()}: ${value} → ${command.toString("hex")}`);

      // Here you would send the command via Bluetooth
      createGaiaMessage(command)
    } catch (error) {
      console.error('Error sending command:', error);
    }

  };

  const handleSliderChange = (index: number, type: "frequency" | "gain" | "quality", value: number) => {

    const updatedSettings = [...settings];
    updatedSettings[index][type] = Number(value.toFixed(1));

    setSettings(updatedSettings);

    const bandId = bandsSettingsMock[index].id;
    //console.warn("bandId",bandId)
    sendEQParameter(bandId, type, value);
  };



  const formatFrequency = (value: number | null): string => {
    if (value === null) return "- Hz";
    if (value < 50) return `${value.toFixed(1)} Hz`;
    if (value < 1000) return `${value.toFixed(0)} Hz`;
    return `${(value / 1000).toFixed(1)} kHz`;
  };









  const handleOpenModalGainSelectValue = (index: number, type: "frequency" | "gain" | "quality", value: number) => {

    setSelectedBand({ id: index, type: 'gain', value: String(value) })

    setIsModalSelectValueVisible(true)
  }

  const handleOpenModalQualitySelectValue = (index: number, type: "frequency" | "gain" | "quality", value: number) => {
    setSelectedBand({ id: index, type: 'quality', value: String(value) })

    setIsModalSelectValueVisible(true)
  }


  const onValueChangeGainVertical = (newValue: number, id: number) => {
    setSelectedBand({ id: id, type: "gain", value: String(newValue) })
    // if (selectedBand) {
    //   if(selectedBand.type === 'quality'){
    //     const newArray = bands?.map((item) =>
    //       item.id === selectedBand.id  ? { ...item, quality: newValue } : item) as IBand[];
    //     setBands(newArray)
    //     return 
    //   }
    //   if(selectedBand.type === 'gain'){
    //     const newArray = bands?.map((item) =>
    //       item.id === selectedBand.id  ? { ...item, gain: newValue } : item) as IBand[];
    //     setBands(newArray)
    //     return 
    //   }

    // }

  }
  useEffect(() => {
    const listener = DeviceEventEmitter.addListener("onEventEqualizer", (data) => {

      sendEQParameter(data.bandId, data.type, data.value)
    });

    return () => listener.remove(); // Remove o listener ao desmontar o componente
  }, []);

  return (
    <S.Container>

      <S.ContainerEqualizer>
        <S.ContainerRow horizontal
          showsHorizontalScrollIndicator={false} >
          {bandsSettingsMock?.map((item, index) => (
            <S.SliderContainer key={item.id}>
              <S.ContainerBars onPress={() =>
                handleOpenModalGainSelectValue(index, "gain", Number(settings[index]?.gain))
              } >
                <Text color='black' fontSize={12}>{settings[index]?.gain} dB</Text>

              </S.ContainerBars>


              <S.ContainerBar>

                <VerticalSlider
                  disabled={disabled}
                  disabledSlider={disabledGain}
                  min={-10}
                  max={10}
                  value={settings[index]?.gain ?? 0}
                  onValueChange={(value) => handleSliderChange(index, "gain", value)}
                  //  onSlidingComplete={onSlidingCompleteGain}
                  //  onSlidingComplete ={generateCodeForGain}
                  onTouchStart={() => handleScrollEnabled(false)}
                  onTouchEnd={() => handleScrollEnabled(true)}
                  step={0.01}
                />


              </S.ContainerBar>
              <S.ContainerInputs>
                <S.ContainerBar>
                  <Text color='#777777' variant='bold' fontSize={12}>Freq.</Text>
                  <S.Circle>

                    <Text color='black' variant='bold' fontSize={12}> {item?.label}</Text>
                  </S.Circle>

                  <Spacer h={10} />
                  <Text color='#777777' variant='bold' fontSize={12}>Q.</Text>
                  <S.ButtonCircle onPress={() =>
                    handleOpenModalQualitySelectValue(index, "quality", Number(settings[index]?.quality))
                  }>
                    <Text color='black' variant='bold' fontSize={12}>{settings[index]?.quality.toFixed(2)}</Text>
                  </S.ButtonCircle>

                </S.ContainerBar>
              </S.ContainerInputs>
            </S.SliderContainer>

          ))}
        </S.ContainerRow>

      </S.ContainerEqualizer>



    </S.Container>
  )
}
export default EqualizerSliders


