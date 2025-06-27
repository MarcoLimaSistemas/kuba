import React from 'react';
import { View, Text,  StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface EqualizerSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
}

const EqualizerSlider: React.FC<EqualizerSliderProps> = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#000' }}>{label}</Text>
      <Slider
        style={styles.slider}
        minimumValue={-10}
        maximumValue={10}
        step={1}
        value={value}
        onValueChange={onValueChange}
      />
      <Text style={{ fontSize: 10, fontWeight: 'bold', color: '#000' }}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  slider: {
    width: 300,
    height: 40,
    color:'#000',
  },
});

export default EqualizerSlider;
