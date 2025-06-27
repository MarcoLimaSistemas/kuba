import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {scale} from 'react-native-size-matters';
import {Icons} from '@assets/icons';
import {Spacer} from '@components/Spacer';
import Text from '@components/Text';
import {Equalizer} from './index';
import {GaiaEqualizer} from './GaiaEqualizer';
import {GaiaEqualizerState} from '@hooks/useGaiaEqualizer';
import * as S from './styles';

interface EqualizerWrapperProps {
  createGaiaMessage: (command: any) => void;
  handleScrollEnabled: (enabled: boolean) => void;
  handlePreset: (preset: any) => void;
  handleFrequencies: (frequencies: any[]) => void;
  handleModalEdit: (isEdit: boolean) => void;
  onOpen: () => void;
  disabled?: boolean;
  frequenciesList?: any[];
}

export const EqualizerWrapper: React.FC<EqualizerWrapperProps> = ({
  createGaiaMessage,
  handleScrollEnabled,
  handlePreset,
  handleFrequencies,
  handleModalEdit,
  onOpen,
  disabled = false,
  frequenciesList,
}) => {
  const [useGaia, setUseGaia] = useState(false);

  const handleGaiaStateChange = (state: GaiaEqualizerState) => {
    // Convert GAIA state to the format expected by the parent component
    const convertedFrequencies = state.bands.map((band, index) => ({
      frequency: band.frequency.toString(),
      decibelQuantity: band.gain,
    }));

    handleFrequencies(convertedFrequencies);
  };

  const toggleEqualizerMode = () => {
    setUseGaia(!useGaia);
  };

  return (
    <S.Container>
      {/* Mode Toggle */}
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
        <Text variant="bold" color="#656565" style={{marginRight: 16}}>
          Modo:
        </Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: !useGaia ? '#0033A0' : '#f0f0f0',
            borderRadius: 16,
            marginRight: 8,
          }}
          onPress={() => setUseGaia(false)}
          disabled={disabled}>
          <Text fontSize={12} color={!useGaia ? '#FFFFFF' : '#656565'}>
            Original
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            backgroundColor: useGaia ? '#0033A0' : '#f0f0f0',
            borderRadius: 16,
          }}
          onPress={() => setUseGaia(true)}
          disabled={disabled}>
          <Text fontSize={12} color={useGaia ? '#FFFFFF' : '#656565'}>
            GAIA
          </Text>
        </TouchableOpacity>
      </View>

      {/* Equalizer Component */}
      {useGaia ? (
        <GaiaEqualizer
          createGaiaMessage={createGaiaMessage}
          handleScrollEnabled={handleScrollEnabled}
          onStateChange={handleGaiaStateChange}
          disabled={disabled}
        />
      ) : (
        <Equalizer
          handleScrollEnabled={handleScrollEnabled}
          handlePreset={handlePreset}
          handleFrequencies={handleFrequencies}
          handleModalEdit={handleModalEdit}
          onOpen={onOpen}
          disabled={disabled}
          frequenciesList={frequenciesList}
        />
      )}
    </S.Container>
  );
};
