import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Slider from '@react-native-community/slider';
import {useGaiaDevice, BluetoothDevice} from '@hooks/useGaiaDevice';

const bands = [
  {id: 1, label: '125 Hz', frequency: 125},
  {id: 2, label: '250 Hz', frequency: 250},
  {id: 3, label: '500 Hz', frequency: 500},
  {id: 4, label: '1 kHz', frequency: 1000},
  {id: 5, label: '2 kHz', frequency: 2000},
  {id: 6, label: '4 kHz', frequency: 4000},
  {id: 7, label: '8 kHz', frequency: 8000},
  {id: 8, label: '16 kHz', frequency: 16000},
];

interface FilterEqualizerScreenProps {
  device: BluetoothDevice;
  handleScrollEnabled: (enabled: boolean) => void;
}

const EqualizerNew = ({
  device,
  handleScrollEnabled,
}: FilterEqualizerScreenProps) => {
  const [settings, setSettings] = useState(
    bands.map(() => ({gain: 0, quality: 1})),
  );

  const {sendEQParameter} = useGaiaDevice({device});

  // ✅ Configuração da Banda única usada no EQ
  const BAND_ID = 1; // Usamos apenas uma banda para ajuste

  const [frequency, setFrequency] = useState(1000); // Hz
  const [gain, setGain] = useState(0); // dB
  const [quality, setQuality] = useState(1.0); // Q-Factor

  const handleSliderChange = async (
    type: 'frequency' | 'gain' | 'quality',
    value: number,
  ) => {
    if (type === 'frequency') {
      setFrequency(value);
    } else if (type === 'gain') {
      setGain(value);
    } else {
      setQuality(value);
    }

    try {
      await sendEQParameter(BAND_ID, type, value);
      console.log(`Enviando ${type.toUpperCase()}: ${value}`);
    } catch (error) {
      console.error('Error sending EQ parameter:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      onTouchStart={() => handleScrollEnabled(false)}
      onTouchEnd={() => handleScrollEnabled(true)}>
      <Text style={{color: '#000'}}>Frequência: {frequency.toFixed(0)} Hz</Text>
      <Slider
        style={styles.slider}
        minimumValue={20}
        maximumValue={20000}
        step={10}
        value={frequency}
        onValueChange={value => handleSliderChange('frequency', value)}
      />

      {/* Ganho */}
      <Text style={{color: '#000'}}>Ganho: {gain.toFixed(1)} dB</Text>
      <Slider
        style={styles.slider}
        minimumValue={-12}
        maximumValue={12}
        step={0.1}
        value={gain}
        onValueChange={value => handleSliderChange('gain', value)}
      />

      {/* Qualidade */}
      <Text style={{color: '#000'}}>Qualidade: {quality.toFixed(2)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.25}
        maximumValue={8}
        step={0.01}
        value={quality}
        onValueChange={value => handleSliderChange('quality', value)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  sliderContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    width: '100%',
  },
  label: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 40,
  },
});

export default EqualizerNew;
