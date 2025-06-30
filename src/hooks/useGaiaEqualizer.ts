import {useState, useCallback, useEffect} from 'react';
import {Buffer} from 'buffer';
import {
  GAIA,
  Controls,
  ParameterTypes,
  FilterTypes,
  setPreset,
  setControlActivation,
  setEQParameter,
  setMasterGain,
  setBandFilter,
  setBandFrequency,
  setBandGain,
  setBandQuality,
  frequencyToGaia,
  gainToGaia,
  qualityToGaia,
  createGaiaPacket,
  GaiaPacket,
  setBandFrequencyRealDevice,
  setBandGainRealDevice,
  setBandQualityRealDevice,
} from '@utils/gaiaCommands';

export interface GaiaEqualizerState {
  currentPreset: number;
  bassBoostEnabled: boolean;
  enhancement3DEnabled: boolean;
  presetsEnabled: boolean;
  masterGain: number;
  bands: Array<{
    id: number;
    frequency: number;
    quality: number;
    gain: number;
    filter: number;
  }>;
}

export interface UseGaiaEqualizerProps {
  createGaiaMessage: (command: Buffer) => void;
  onStateChange?: (state: GaiaEqualizerState) => void;
}

// Default bands configuration based on GAIA protocol
const DEFAULT_BANDS = [
  {
    id: 1,
    frequency: 60,
    quality: 1.0,
    gain: 0,
    filter: FilterTypes.PARAMETRIC_EQUALIZER,
  },
  {
    id: 2,
    frequency: 170,
    quality: 1.0,
    gain: 0,
    filter: FilterTypes.PARAMETRIC_EQUALIZER,
  },
  {
    id: 3,
    frequency: 310,
    quality: 1.0,
    gain: 0,
    filter: FilterTypes.PARAMETRIC_EQUALIZER,
  },
  {
    id: 4,
    frequency: 600,
    quality: 1.0,
    gain: 0,
    filter: FilterTypes.PARAMETRIC_EQUALIZER,
  },
  {
    id: 5,
    frequency: 1000,
    quality: 1.0,
    gain: 0,
    filter: FilterTypes.PARAMETRIC_EQUALIZER,
  },
];

export const useGaiaEqualizer = ({
  createGaiaMessage,
  onStateChange,
}: UseGaiaEqualizerProps) => {
  const [state, setState] = useState<GaiaEqualizerState>({
    currentPreset: 0,
    bassBoostEnabled: false,
    enhancement3DEnabled: false,
    presetsEnabled: true,
    masterGain: 0,
    bands: DEFAULT_BANDS,
  });

  // Notify parent component of state changes
  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  // Send GAIA packet to device
  const sendGaiaPacket = useCallback(
    (packet: GaiaPacket) => {
      try {
        const buffer = Buffer.from(packet.raw);
        createGaiaMessage(buffer);
        console.log('GAIA packet sent:', packet);
      } catch (error) {
        console.error('Error sending GAIA packet:', error);
      }
    },
    [createGaiaMessage],
  );

  // Set equalizer preset using COMMAND_SET_EQ_CONTROL
  const setEqualizerPreset = useCallback(
    (preset: number) => {
      try {
        const packet = setPreset(preset);
        sendGaiaPacket(packet);

        setState(prev => ({
          ...prev,
          currentPreset: preset,
        }));
      } catch (error) {
        console.error('Error setting preset:', error);
      }
    },
    [sendGaiaPacket],
  );

  // Toggle control (Bass Boost, 3D Enhancement, Presets)
  const toggleControl = useCallback(
    (control: (typeof Controls)[keyof typeof Controls], enabled: boolean) => {
      try {
        const packet = setControlActivation(control, enabled);
        sendGaiaPacket(packet);

        setState(prev => ({
          ...prev,
          ...(control === Controls.BASS_BOOST && {bassBoostEnabled: enabled}),
          ...(control === Controls.ENHANCEMENT_3D && {
            enhancement3DEnabled: enabled,
          }),
          ...(control === Controls.PRESETS && {presetsEnabled: enabled}),
        }));
      } catch (error) {
        console.error('Error toggling control:', error);
      }
    },
    [sendGaiaPacket],
  );

  // Set band parameter usando protocolo real do dispositivo
  const setBandParameter = useCallback(
    (
      bandId: number,
      parameter: (typeof ParameterTypes)[keyof typeof ParameterTypes],
      value: number,
    ) => {
      try {
        let packet: GaiaPacket | undefined;
        if (parameter === ParameterTypes.FREQUENCY) {
          packet = setBandFrequencyRealDevice(bandId, value);
        } else if (parameter === ParameterTypes.GAIN) {
          packet = setBandGainRealDevice(bandId, value);
        } else if (parameter === ParameterTypes.QUALITY) {
          packet = setBandQualityRealDevice(bandId, value);
        }
        if (packet) {
          sendGaiaPacket(packet);
        }
        setState(prev => ({
          ...prev,
          bands: prev.bands.map(band =>
            band.id === bandId
              ? {
                  ...band,
                  ...(parameter === ParameterTypes.FREQUENCY && {
                    frequency: value,
                  }),
                  ...(parameter === ParameterTypes.QUALITY && {quality: value}),
                  ...(parameter === ParameterTypes.GAIN && {gain: value}),
                  ...(parameter === ParameterTypes.FILTER && {filter: value}),
                }
              : band,
          ),
        }));
      } catch (error) {
        console.error('Error setting band parameter:', error);
      }
    },
    [sendGaiaPacket],
  );

  // Set master gain using COMMAND_SET_EQ_PARAMETER with GENERAL_BAND
  const setMasterGainValue = useCallback(
    (gain: number) => {
      try {
        const packet = setMasterGain(gain);
        sendGaiaPacket(packet);

        setState(prev => ({
          ...prev,
          masterGain: gain,
        }));
      } catch (error) {
        console.error('Error setting master gain:', error);
      }
    },
    [sendGaiaPacket],
  );

  // Set band gain (compatibility with existing equalizer)
  const setBandGain = useCallback(
    (bandIndex: number, gain: number) => {
      const band = state.bands[bandIndex];
      if (band) {
        setBandParameter(band.id, ParameterTypes.GAIN, gain);
      }
    },
    [setBandParameter, state.bands],
  );

  // Set band frequency
  const setBandFrequency = useCallback(
    (bandIndex: number, frequency: number) => {
      const band = state.bands[bandIndex];
      if (band) {
        setBandParameter(band.id, ParameterTypes.FREQUENCY, frequency);
      }
    },
    [setBandParameter, state.bands],
  );

  // Set band quality
  const setBandQuality = useCallback(
    (bandIndex: number, quality: number) => {
      const band = state.bands[bandIndex];
      if (band) {
        setBandParameter(band.id, ParameterTypes.QUALITY, quality);
      }
    },
    [setBandParameter, state.bands],
  );

  // Set band filter type
  const setBandFilterType = useCallback(
    (
      bandIndex: number,
      filterType: (typeof FilterTypes)[keyof typeof FilterTypes],
    ) => {
      const band = state.bands[bandIndex];
      if (band) {
        setBandParameter(band.id, ParameterTypes.FILTER, filterType);
      }
    },
    [setBandParameter, state.bands],
  );

  // Reset equalizer to default values
  const resetEqualizer = useCallback(() => {
    setState({
      currentPreset: 0,
      bassBoostEnabled: false,
      enhancement3DEnabled: false,
      presetsEnabled: true,
      masterGain: 0,
      bands: DEFAULT_BANDS,
    });

    // Send reset commands
    setEqualizerPreset(0);
    toggleControl(Controls.BASS_BOOST, false);
    toggleControl(Controls.ENHANCEMENT_3D, false);
    setMasterGainValue(0);

    // Reset all bands
    DEFAULT_BANDS.forEach(band => {
      setBandParameter(band.id, ParameterTypes.FILTER, band.filter);
      setBandParameter(band.id, ParameterTypes.FREQUENCY, band.frequency);
      setBandParameter(band.id, ParameterTypes.QUALITY, band.quality);
      setBandParameter(band.id, ParameterTypes.GAIN, band.gain);
    });
  }, [setEqualizerPreset, toggleControl, setMasterGainValue, setBandParameter]);

  // Load preset configuration
  const loadPreset = useCallback(
    (presetConfig: {
      bands: Array<{
        frequency: number;
        quality: number;
        gain: number;
        filter?: number;
      }>;
      masterGain: number;
      bassBoost?: boolean;
      enhancement3D?: boolean;
    }) => {
      setState(prev => ({
        ...prev,
        masterGain: presetConfig.masterGain,
        bassBoostEnabled: presetConfig.bassBoost ?? false,
        enhancement3DEnabled: presetConfig.enhancement3D ?? false,
        bands: prev.bands.map((band, index) => ({
          ...band,
          ...presetConfig.bands[index],
          filter: presetConfig.bands[index].filter ?? band.filter,
        })),
      }));

      // Apply preset to device
      setMasterGainValue(presetConfig.masterGain);
      if (presetConfig.bassBoost !== undefined) {
        toggleControl(Controls.BASS_BOOST, presetConfig.bassBoost);
      }
      if (presetConfig.enhancement3D !== undefined) {
        toggleControl(Controls.ENHANCEMENT_3D, presetConfig.enhancement3D);
      }

      presetConfig.bands.forEach((bandConfig, index) => {
        const band = state.bands[index];
        if (band) {
          if (bandConfig.filter !== undefined) {
            setBandParameter(band.id, ParameterTypes.FILTER, bandConfig.filter);
          }
          setBandParameter(
            band.id,
            ParameterTypes.FREQUENCY,
            bandConfig.frequency,
          );
          setBandParameter(band.id, ParameterTypes.QUALITY, bandConfig.quality);
          setBandParameter(band.id, ParameterTypes.GAIN, bandConfig.gain);
        }
      });
    },
    [setMasterGainValue, toggleControl, setBandParameter, state.bands],
  );

  // Initialize equalizer with default settings
  const initializeEqualizer = useCallback(() => {
    // Set all bands to parametric equalizer filter
    DEFAULT_BANDS.forEach(band => {
      setBandParameter(
        band.id,
        ParameterTypes.FILTER,
        FilterTypes.PARAMETRIC_EQUALIZER,
      );
    });
  }, [setBandParameter]);

  // Initialize on mount
  useEffect(() => {
    initializeEqualizer();
  }, [initializeEqualizer]);

  return {
    state,
    setEqualizerPreset,
    toggleControl,
    setBandParameter,
    setMasterGainValue,
    setBandGain,
    setBandFrequency,
    setBandQuality,
    setBandFilterType,
    resetEqualizer,
    loadPreset,
    initializeEqualizer,
  };
};
