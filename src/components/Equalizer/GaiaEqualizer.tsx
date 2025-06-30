import React, {useState, useMemo} from 'react';
import {View, ScrollView, TouchableOpacity, Switch, Alert} from 'react-native';
import {scale} from 'react-native-size-matters';
import Slider from '@react-native-community/slider';
import {Icons} from '@assets/icons';
import {Spacer} from '@components/Spacer';
import Text from '@components/Text';
import {useGaiaEqualizer, GaiaEqualizerState} from '@hooks/useGaiaEqualizer';
import {Controls, FilterTypes} from '@utils/gaiaCommands';
import * as S from './styles';

interface GaiaEqualizerProps {
  createGaiaMessage: (command: any) => void;
  handleScrollEnabled: (enabled: boolean) => void;
  onStateChange?: (state: GaiaEqualizerState) => void;
  disabled?: boolean;
}

const PRESETS = [
  {id: 0, name: 'Flat', icon: 'music-note'},
  {id: 1, name: 'Custom', icon: 'tune', customizable: true},
  {id: 2, name: 'Bass', icon: 'music-note'},
  {id: 3, name: 'Treble', icon: 'music-note'},
  {id: 4, name: 'Rock', icon: 'music-note'},
  {id: 5, name: 'Jazz', icon: 'music-note'},
  {id: 6, name: 'Classical', icon: 'music-note'},
];

// GAIA Equalizer uses 5 bands with specific frequencies
const GAIA_FREQUENCIES = [60, 170, 310, 600, 1000];

export const GaiaEqualizer: React.FC<GaiaEqualizerProps> = ({
  createGaiaMessage,
  handleScrollEnabled,
  onStateChange,
  disabled = false,
}) => {
  const [selectedBand, setSelectedBand] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    state,
    setEqualizerPreset,
    toggleControl,
    setBandGain,
    setBandFrequency,
    setBandQuality,
    setBandFilterType,
    setMasterGainValue,
    resetEqualizer,
  } = useGaiaEqualizer({
    createGaiaMessage,
    onStateChange,
  });

  const handlePresetSelect = (presetId: number) => {
    if (disabled) {
      return;
    }

    setEqualizerPreset(presetId);
  };

  const handleControlToggle = (
    control: (typeof Controls)[keyof typeof Controls],
    value: boolean,
  ) => {
    if (disabled) {
      return;
    }

    toggleControl(control, value);
  };

  const handleBandGainChange = (bandIndex: number, value: number) => {
    if (disabled) {
      return;
    }

    setBandGain(bandIndex, value);
  };

  const handleMasterGainChange = (value: number) => {
    if (disabled) {
      return;
    }

    setMasterGainValue(value);
  };

  const handleReset = () => {
    Alert.alert(
      'Reset Equalizer',
      'Deseja resetar o equalizer para as configurações padrão?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Resetar', onPress: resetEqualizer},
      ],
    );
  };

  const renderPresetButton = (preset: (typeof PRESETS)[0]) => (
    <TouchableOpacity
      key={preset.id}
      style={[
        S.PresetButton,
        state.currentPreset === preset.id && S.PresetButtonSelected,
        disabled && S.PresetButtonDisabled,
      ]}
      onPress={() => handlePresetSelect(preset.id)}
      disabled={disabled}>
      <Icons.Logo
        width={scale(24)}
        height={scale(24)}
        color={state.currentPreset === preset.id ? '#FFFFFF' : '#656565'}
      />
      <Text
        fontSize={12}
        color={state.currentPreset === preset.id ? '#FFFFFF' : '#656565'}
        style={{marginTop: 4}}>
        {preset.name}
      </Text>
    </TouchableOpacity>
  );

  const renderControlSwitch = (
    title: string,
    value: boolean,
    onValueChange: (value: boolean) => void,
    control: (typeof Controls)[keyof typeof Controls],
  ) => (
    <View style={S.ControlSwitchContainer}>
      <View style={S.ControlSwitchContent}>
        <Text fontSize={14} color={disabled ? '#d7d7d7' : '#656565'}>
          {title}
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          trackColor={{false: '#d7d7d7', true: '#0033A0'}}
          thumbColor={disabled ? '#d7d7d7' : '#FFFFFF'}
        />
      </View>
    </View>
  );

  const renderBandSlider = (
    bandIndex: number,
    frequency: number,
    gain: number,
  ) => (
    <View key={bandIndex} style={S.BandContainer}>
      <View style={S.BandSlider}>
        <Slider
          style={S.VerticalSlider}
          minimumValue={-12}
          maximumValue={12}
          value={gain}
          onValueChange={value => handleBandGainChange(bandIndex, value)}
          onTouchStart={() => handleScrollEnabled(false)}
          onTouchEnd={() => handleScrollEnabled(true)}
          disabled={disabled}
          minimumTrackTintColor={disabled ? '#d7d7d7' : '#0033A0'}
          maximumTrackTintColor="#E0E0E0"
          thumbTintColor={disabled ? '#d7d7d7' : '#0033A0'}
        />
      </View>
      <Spacer h={8} />
      <Text
        fontSize={10}
        color={disabled ? '#d7d7d7' : '#656565'}
        style={{textAlign: 'center'}}>
        {frequency < 1000 ? frequency : `${frequency / 1000}k`}
      </Text>
      <Text
        fontSize={10}
        color={disabled ? '#d7d7d7' : '#656565'}
        style={{textAlign: 'center'}}>
        {gain > 0 ? `+${gain}` : gain}dB
      </Text>
    </View>
  );

  return (
    <ScrollView style={S.Container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <S.Header>
        <Text variant="bold" color="#656565">
          Equalizador GAIA
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => setShowAdvanced(!showAdvanced)}>
            <Icons.Pencil
              width={scale(24)}
              height={scale(24)}
              color={disabled ? '#d7d7d7' : '#6E6E6E'}
            />
          </TouchableOpacity>
          <Spacer w={16} />
          <TouchableOpacity disabled={disabled} onPress={handleReset}>
            <Icons.Trash
              width={scale(24)}
              height={scale(24)}
              color={disabled ? '#d7d7d7' : '#6E6E6E'}
            />
          </TouchableOpacity>
        </View>
      </S.Header>

      {/* Presets */}
      <S.Section>
        <Text
          variant="bold"
          fontSize={16}
          color="#656565"
          style={{marginBottom: 16}}>
          Presets
        </Text>
        <View style={S.PresetsGrid}>{PRESETS.map(renderPresetButton)}</View>
      </S.Section>

      {/* Controls */}
      {showAdvanced && (
        <S.Section>
          <Text
            variant="bold"
            fontSize={16}
            color="#656565"
            style={{marginBottom: 16}}>
            Controles
          </Text>
          {renderControlSwitch(
            'Bass Boost',
            state.bassBoostEnabled,
            value => handleControlToggle(Controls.BASS_BOOST, value),
            Controls.BASS_BOOST,
          )}
          {renderControlSwitch(
            '3D Enhancement',
            state.enhancement3DEnabled,
            value => handleControlToggle(Controls.ENHANCEMENT_3D, value),
            Controls.ENHANCEMENT_3D,
          )}
          {renderControlSwitch(
            'Presets',
            state.presetsEnabled,
            value => handleControlToggle(Controls.PRESETS, value),
            Controls.PRESETS,
          )}
        </S.Section>
      )}

      {/* Frequency Bands - GAIA uses 5 bands */}
      <S.Section>
        <Text
          variant="bold"
          fontSize={16}
          color="#656565"
          style={{marginBottom: 16}}>
          Bandas de Frequência (GAIA)
        </Text>
        <View style={S.BandsContainer}>
          {state.bands.map((band, index) =>
            renderBandSlider(index, band.frequency, band.gain),
          )}
        </View>
      </S.Section>

      {/* Master Gain */}
      <S.Section>
        <Text
          variant="bold"
          fontSize={16}
          color="#656565"
          style={{marginBottom: 16}}>
          Master Gain
        </Text>
        <View style={S.MasterGainContainer}>
          <Text fontSize={12} color={disabled ? '#d7d7d7' : '#656565'}>
            -12dB
          </Text>
          <View style={S.MasterGainSlider}>
            <Slider
              style={S.HorizontalSlider}
              minimumValue={-12}
              maximumValue={12}
              value={state.masterGain}
              onValueChange={handleMasterGainChange}
              onTouchStart={() => handleScrollEnabled(false)}
              onTouchEnd={() => handleScrollEnabled(true)}
              disabled={disabled}
              minimumTrackTintColor={disabled ? '#d7d7d7' : '#0033A0'}
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor={disabled ? '#d7d7d7' : '#0033A0'}
            />
          </View>
          <Text fontSize={12} color={disabled ? '#d7d7d7' : '#656565'}>
            +12dB
          </Text>
        </View>
        <Text
          fontSize={14}
          color={disabled ? '#d7d7d7' : '#656565'}
          style={{textAlign: 'center', marginTop: 8}}>
          {state.masterGain > 0 ? `+${state.masterGain}` : state.masterGain}dB
        </Text>
      </S.Section>

      <Spacer h={32} />
    </ScrollView>
  );
};
