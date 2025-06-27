import * as S from './styles';
import React, {useEffect} from 'react';
import Text from '@components/Text';
import {DeviceEventEmitter, GestureResponderEvent} from 'react-native';
import VerticalSlider from '@components/Slider';
import {useValuesEqualizer} from '@hooks/useValuesEqualizer';
import {Spacer} from '@components/Spacer';
import {bandsSettingsMock} from '@screens/Client/HomeScreen/initialDate';
import {useGaiaDevice, BluetoothDevice} from '@hooks/useGaiaDevice';

interface IEqualizerSlidersProps {
  device: BluetoothDevice;
  handleScrollEnabled: (enabled: boolean) => void;
}

const EqualizerSliders: React.FC<IEqualizerSlidersProps> = ({
  device,
  handleScrollEnabled,
}) => {
  const disabled = false;
  const disabledGain = false;
  const {
    frequency,
    gain,
    quality,
    setIsModalSelectValueVisible,
    setSelectedBand,
    selectedBand,
    settings,
    setSettings,
  } = useValuesEqualizer();

  const {sendEQParameter} = useGaiaDevice({device});

  const handleSliderChange = async (
    index: number,
    type: 'frequency' | 'gain' | 'quality',
    value: number,
  ) => {
    const updatedSettings = [...settings];
    updatedSettings[index][type] = Number(value.toFixed(1));
    setSettings(updatedSettings);

    const bandId = bandsSettingsMock[index].id;

    try {
      const success = await sendEQParameter(bandId, type, value);
      if (success) {
        console.log(`Band ${bandId} - ${type.toUpperCase()}: ${value}`);
      }
    } catch (error) {
      console.error('Error sending EQ parameter:', error);
    }
  };

  const formatFrequency = (value: number | null): string => {
    if (value === null) {
      return '- Hz';
    }
    if (value < 50) {
      return `${value.toFixed(1)} Hz`;
    }
    if (value < 1000) {
      return `${value.toFixed(0)} Hz`;
    }
    return `${(value / 1000).toFixed(1)} kHz`;
  };

  const handleOpenModalGainSelectValue = (
    index: number,
    type: 'frequency' | 'gain' | 'quality',
    value: number,
  ) => {
    setSelectedBand({id: index, type: 'gain', value: String(value)});
    setIsModalSelectValueVisible(true);
  };

  const handleOpenModalQualitySelectValue = (
    index: number,
    type: 'frequency' | 'gain' | 'quality',
    value: number,
  ) => {
    setSelectedBand({id: index, type: 'quality', value: String(value)});
    setIsModalSelectValueVisible(true);
  };

  const onValueChangeGainVertical = (newValue: number, id: number) => {
    setSelectedBand({id: id, type: 'gain', value: String(newValue)});
  };

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'onEventEqualizer',
      async data => {
        try {
          await sendEQParameter(data.bandId, data.type, data.value);
        } catch (error) {
          console.error('Error sending EQ parameter from event:', error);
        }
      },
    );

    return () => listener.remove(); // Remove o listener ao desmontar o componente
  }, [sendEQParameter]);

  return (
    <S.Container>
      <S.ContainerEqualizer>
        <S.ContainerRow horizontal showsHorizontalScrollIndicator={false}>
          {bandsSettingsMock?.map((item, index) => (
            <S.SliderContainer key={item.id}>
              <S.ContainerBars
                onPress={() =>
                  handleOpenModalGainSelectValue(
                    index,
                    'gain',
                    Number(settings[index]?.gain),
                  )
                }>
                <Text color="black" fontSize={12}>
                  {settings[index]?.gain} dB
                </Text>
              </S.ContainerBars>

              <S.ContainerBar>
                <VerticalSlider
                  disabled={disabled}
                  disabledSlider={disabledGain}
                  min={-10}
                  max={10}
                  value={settings[index]?.gain ?? 0}
                  onValueChange={value =>
                    handleSliderChange(index, 'gain', value)
                  }
                  onTouchStart={() => handleScrollEnabled(false)}
                  onSlidingComplete={() => handleScrollEnabled(true)}
                  step={0.01}
                />
              </S.ContainerBar>

              <S.ContainerInputs>
                <S.ContainerBar>
                  <Text color="#777777" variant="bold" fontSize={12}>
                    Freq.
                  </Text>
                  <S.Circle>
                    <Text color="black" variant="bold" fontSize={12}>
                      {' '}
                      {item?.label}
                    </Text>
                  </S.Circle>

                  <Spacer h={10} />
                  <Text color="#777777" variant="bold" fontSize={12}>
                    Q.
                  </Text>
                  <S.ButtonCircle
                    onPress={() =>
                      handleOpenModalQualitySelectValue(
                        index,
                        'quality',
                        Number(settings[index]?.quality),
                      )
                    }>
                    <Text color="black" variant="bold" fontSize={12}>
                      {settings[index]?.quality.toFixed(2)}
                    </Text>
                  </S.ButtonCircle>
                </S.ContainerBar>
              </S.ContainerInputs>
            </S.SliderContainer>
          ))}
        </S.ContainerRow>
      </S.ContainerEqualizer>
    </S.Container>
  );
};

export default EqualizerSliders;
