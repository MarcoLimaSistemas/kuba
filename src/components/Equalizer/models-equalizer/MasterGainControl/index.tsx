import React, {useState} from 'react';
import * as S from './styles';

// import Slider from '@react-native-community/slider';
// import RadioButton from '@components/RadioButton';
import {Button} from '@components/Button';
// import { Text } from '@components/Text/styles';
import {Buffer} from 'buffer';
import {useValuesEqualizer} from '@hooks/useValuesEqualizer';
import EqualizerVisual from '@components/Equalizer/ui/equalizer';
import {useGaiaDevice, BluetoothDevice} from '@hooks/useGaiaDevice';

global.Buffer = global.Buffer || Buffer;

enum Filter {
  BYPASS,
  LOW_PASS_1,
  HIGH_SHELF_2,
}

interface FilterEqualizerScreenProps {
  device: BluetoothDevice;
  handleScrollEnabled: (enabled: boolean) => void;
}

const MasterGainControl: React.FC<FilterEqualizerScreenProps> = ({
  device,
  handleScrollEnabled,
}) => {
  const {
    frequency,
    setFrequency,
    gain,
    setGain,
    quality,
    setQuality,
    selectedOptionBand,
    setSelectedOptionBand,
  } = useValuesEqualizer();

  const {sendEQParameter} = useGaiaDevice({device});

  const [minFrequency, setMinFrequency] = useState<number>(20);
  const [maxFrequency, setMaxFrequency] = useState<number>(20000);

  const logMinFrequency = Math.log10(minFrequency);
  const logMaxFrequency = Math.log10(maxFrequency);

  const logMinQuality = Math.log10(0.25);
  const logMaxQuality = Math.log10(8);

  // Converts the linear value (0 to 1) to logarithmic in the real range
  const convertLogScaleFrequency = (linearValue: number) => {
    const result = Math.pow(
      10,
      linearValue * (logMaxFrequency - logMinFrequency) + logMinFrequency,
    );
    return parseFloat(result.toFixed(1));
  };

  const convertLogScaleQuality = (linearValue: number) =>
    Math.pow(
      10,
      linearValue * (logMaxQuality - logMinQuality) + logMinQuality,
    ).toFixed(2);

  const [selectedFilter, setSelectedFilter] = useState<Filter>(Filter.BYPASS);

  const disabledFrequency = frequency === '0';
  const disabledGain = gain === '0';
  const disabledQuality = quality === '0';

  const handleSelect = (option: string) => {
    setSelectedOptionBand(option);
  };

  const generateCodeForFrequency = async (frequency: number) => {
    try {
      const success = await sendEQParameter(1, 'frequency', frequency);
      if (success) {
        console.log('Frequency sent:', frequency);
      }
    } catch (error) {
      console.error('Error sending frequency:', error);
    }
  };

  const generateCodeForGain = async (gain: number) => {
    try {
      const success = await sendEQParameter(1, 'gain', gain);
      if (success) {
        console.log('Gain sent:', gain);
      }
    } catch (error) {
      console.error('Error sending gain:', error);
    }
  };

  const generateCodeForQuality = async (quality: number) => {
    try {
      const success = await sendEQParameter(1, 'quality', quality);
      if (success) {
        console.log('Quality sent:', quality);
      }
    } catch (error) {
      console.error('Error sending quality:', error);
    }
  };

  return (
    <S.Container>
      <EqualizerVisual
        frequency={parseFloat(frequency)}
        quality={parseFloat(quality)}
        gain={parseFloat(gain)}
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
        onValueChangeFrequency={(value: number) =>
          setFrequency(String(convertLogScaleFrequency(value)))
        }
        onValueChangeQuality={(value: number) =>
          setQuality(String(convertLogScaleQuality(value)))
        }
        onValueChangeGain={(value: number) => setGain(String(value.toFixed(1)))}
        onTouchStart={() => handleScrollEnabled(false)}
        onTouchEnd={() => handleScrollEnabled(true)}
      />
    </S.Container>
  );
};

export default MasterGainControl;
