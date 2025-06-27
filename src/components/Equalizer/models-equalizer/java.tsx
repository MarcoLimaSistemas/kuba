import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import EqualizerSlider from '../../../screens/Client/Device/slider';
import {useGaiaDevice, BluetoothDevice} from '@hooks/useGaiaDevice';

interface Settings {
  gain: number;
  quality: number;
}

interface FilterEqualizerScreenProps {
  device: BluetoothDevice;
  handleScrollEnabled: (enabled: boolean) => void;
}

const EqualizerJava = ({
  device,
  handleScrollEnabled,
}: FilterEqualizerScreenProps) => {
  const [settings, setSettings] = useState<Record<number, Settings>>({
    125: {gain: 0, quality: 0},
    1000: {gain: 0, quality: 0},
    8000: {gain: 0, quality: 0},
  });

  const {sendEQParameter} = useGaiaDevice({device});

  // Mapeamento correto das frequências para as bandas GAIA
  const bandMapping: {[key: number]: number} = {
    125: 1,
    1000: 2,
    8000: 3,
  };

  const handleValueChange = async (
    frequency: number,
    type: 'gain' | 'quality',
    value: number,
  ) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [frequency]: {
        ...prevSettings[frequency],
        [type]: value,
      },
    }));

    await handleApplySettings();
  };

  const sendGAIAPacket = async (
    frequency: number,
    type: 'gain' | 'quality',
    value: number,
  ) => {
    const bandId = bandMapping[frequency];
    if (!bandId) {
      console.error('❌ Frequência não suportada no GAIA:', frequency);
      return false;
    }

    try {
      const success = await sendEQParameter(bandId, type, value);

      if (success) {
        console.log(
          `🎛️ Enviando Comando GAIA: Frequência ${frequency} Hz, ${type} ${value}`,
        );
      }

      return success;
    } catch (error) {
      console.error('Error sending GAIA packet:', error);
      return false;
    }
  };

  const handleApplySettings = async () => {
    for (const frequency of Object.keys(settings)) {
      const freq = parseInt(frequency);
      const {gain, quality} = settings[freq];

      await sendGAIAPacket(freq, 'gain', gain);
      await sendGAIAPacket(freq, 'quality', quality);
    }
  };

  return (
    <View
      style={styles.container}
      onTouchStart={() => handleScrollEnabled(false)}
      onTouchEnd={() => handleScrollEnabled(true)}>
      {Object.keys(settings).map(frequency => {
        const freq = parseInt(frequency);
        return (
          <View key={frequency} style={styles.frequencyContainer}>
            <Text style={styles.frequencyLabel}>{frequency} Hz</Text>
            <EqualizerSlider
              label="Ganho"
              value={settings[freq].gain}
              onValueChange={value => handleValueChange(freq, 'gain', value)}
            />
            <EqualizerSlider
              label="Qualidade"
              value={settings[freq].quality}
              onValueChange={value => handleValueChange(freq, 'quality', value)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  frequencyContainer: {
    marginBottom: 20,
  },
  frequencyLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EqualizerJava;
