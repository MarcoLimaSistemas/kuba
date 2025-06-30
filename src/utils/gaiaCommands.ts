/**
 * GAIA Commands for Equalizer Control
 * Adapted for Kuba-cli-app from GAIA Control Android SDK
 * Based on GAIA Protocol v3.4.0.52
 */

// GAIA Protocol Constants - EXACTLY as defined in GAIA.java
export const GAIA = {
  // Vendor IDs
  VENDOR_NONE: 0x7ffe,
  VENDOR_QUALCOMM: 0x000a,

  // Masks
  COMMAND_MASK: 0x7fff,
  ACKNOWLEDGMENT_MASK: 0x8000,

  // Equalizer Commands - EXACTLY as in GAIA.java
  COMMAND_SET_EQ_CONTROL: 0x0214,
  COMMAND_GET_EQ_CONTROL: 0x0294,
  COMMAND_SET_BASS_BOOST_CONTROL: 0x0215,
  COMMAND_GET_BASS_BOOST_CONTROL: 0x0295,
  COMMAND_SET_3D_ENHANCEMENT_CONTROL: 0x0216,
  COMMAND_GET_3D_ENHANCEMENT_CONTROL: 0x0296,
  COMMAND_SWITCH_EQ_CONTROL: 0x0217,
  COMMAND_TOGGLE_BASS_BOOST_CONTROL: 0x0218,
  COMMAND_TOGGLE_3D_ENHANCEMENT_CONTROL: 0x0219,
  COMMAND_SET_EQ_PARAMETER: 0x021a,
  COMMAND_GET_EQ_PARAMETER: 0x029a,
  COMMAND_SET_EQ_GROUP_PARAMETER: 0x021b,
  COMMAND_GET_EQ_GROUP_PARAMETER: 0x029b,
  COMMAND_SET_USER_EQ_CONTROL: 0x0220,
  COMMAND_GET_USER_EQ_CONTROL: 0x02a0,
  COMMAND_TOGGLE_USER_EQ_CONTROL: 0x0221,
  COMMAND_SET_SPEAKER_EQ_CONTROL: 0x0222,
  COMMAND_GET_SPEAKER_EQ_CONTROL: 0x02a2,
  COMMAND_TOGGLE_SPEAKER_EQ_CONTROL: 0x0223,
} as const;

// Equalizer Controls
export const Controls = {
  ENHANCEMENT_3D: 1,
  BASS_BOOST: 2,
  PRESETS: 3,
} as const;

// Preset Constants
export const NUMBER_OF_PRESETS = 7;
export const CUSTOMIZABLE_PRESET = 1;

// Payload Constants
export const PAYLOAD_BOOLEAN_TRUE = [0x01];
export const PAYLOAD_BOOLEAN_FALSE = [0x00];

// Parameter Types - EXACTLY as in ParameterType.java
export const ParameterTypes = {
  FILTER: 0,
  FREQUENCY: 1,
  GAIN: 2,
  QUALITY: 3,
} as const;

// Filter Types - EXACTLY as in Filter.java
export const FilterTypes = {
  BYPASS: 0,
  LOW_PASS_1: 1,
  HIGH_PASS_1: 2,
  ALL_PASS_1: 3,
  LOW_SHELF_1: 4,
  HIGH_SHELF_1: 5,
  TILT_1: 6,
  LOW_PASS_2: 7,
  HIGH_PASS_2: 8,
  ALL_PASS_2: 9,
  LOW_SHELF_2: 10,
  HIGH_SHELF_2: 11,
  TILT_2: 12,
  PARAMETRIC_EQUALIZER: 13,
} as const;

// Equalizer Constants from CustomEqualizerGaiaManager.java
export const GENERAL_BAND = 0x00;
export const PARAMETER_MASTER_GAIN = 0x01;
export const EQ_PARAMETER_FIRST_BYTE = 0x01;

export interface GaiaPacket {
  command: number;
  payload: number[];
  raw: number[];
}

/**
 * Create a GAIA packet following the exact protocol from GAIA.java
 * @param command - GAIA command
 * @param payload - Packet payload
 * @returns Complete GAIA packet
 */
export const createGaiaPacket = (
  command: number,
  payload: number[] = [],
): GaiaPacket => {
  const vendorId = GAIA.VENDOR_QUALCOMM;
  // Packet length = vendor ID (2) + command (2) + payload
  const packetLength = 2 + 2 + payload.length;

  const raw = [
    0xff, // Start byte
    packetLength & 0xff, // Length LSB
    (packetLength >> 8) & 0xff, // Length MSB
    vendorId & 0xff, // Vendor ID LSB
    (vendorId >> 8) & 0xff, // Vendor ID MSB
    command & 0xff, // Command LSB
    (command >> 8) & 0xff, // Command MSB
    ...payload, // Payload
  ];

  return {
    command,
    payload,
    raw,
  };
};

/**
 * Build parameter ID low byte as in CustomEqualizerGaiaManager.java
 * @param band - Band number (0 for general, 1-5 for specific bands)
 * @param parameter - Parameter type
 * @returns Parameter ID low byte
 */
export const buildParameterIDLowByte = (
  band: number,
  parameter: number,
): number => {
  return (band << 4) | parameter;
};

/**
 * Set equalizer preset using COMMAND_SET_EQ_CONTROL
 * @param preset - Preset number (0-6)
 * @returns GAIA packet
 */
export const setPreset = (preset: number): GaiaPacket => {
  if (preset >= 0 && preset < NUMBER_OF_PRESETS) {
    return createGaiaPacket(GAIA.COMMAND_SET_EQ_CONTROL, [preset]);
  }
  throw new Error(
    `Invalid preset: ${preset}. Must be between 0 and ${NUMBER_OF_PRESETS - 1}`,
  );
};

/**
 * Get current equalizer preset
 * @returns GAIA packet
 */
export const getPreset = (): GaiaPacket => {
  return createGaiaPacket(GAIA.COMMAND_GET_EQ_CONTROL);
};

/**
 * Set control activation state using correct GAIA commands
 * @param control - Control type
 * @param activate - True to enable, false to disable
 * @returns GAIA packet
 */
export const setControlActivation = (
  control: (typeof Controls)[keyof typeof Controls],
  activate: boolean,
): GaiaPacket => {
  const payload = activate ? PAYLOAD_BOOLEAN_TRUE : PAYLOAD_BOOLEAN_FALSE;

  switch (control) {
    case Controls.BASS_BOOST:
      return createGaiaPacket(GAIA.COMMAND_SET_BASS_BOOST_CONTROL, payload);
    case Controls.ENHANCEMENT_3D:
      return createGaiaPacket(GAIA.COMMAND_SET_3D_ENHANCEMENT_CONTROL, payload);
    case Controls.PRESETS:
      return createGaiaPacket(GAIA.COMMAND_SET_USER_EQ_CONTROL, payload);
    default:
      throw new Error(`Invalid control: ${control}`);
  }
};

/**
 * Get control activation state
 * @param control - Control type
 * @returns GAIA packet
 */
export const getControlActivation = (
  control: (typeof Controls)[keyof typeof Controls],
): GaiaPacket => {
  switch (control) {
    case Controls.BASS_BOOST:
      return createGaiaPacket(GAIA.COMMAND_GET_BASS_BOOST_CONTROL);
    case Controls.ENHANCEMENT_3D:
      return createGaiaPacket(GAIA.COMMAND_GET_3D_ENHANCEMENT_CONTROL);
    case Controls.PRESETS:
      return createGaiaPacket(GAIA.COMMAND_GET_USER_EQ_CONTROL);
    default:
      throw new Error(`Invalid control: ${control}`);
  }
};

/**
 * Set EQ parameter using COMMAND_SET_EQ_PARAMETER (exactly as in CustomEqualizerGaiaManager.java)
 * @param band - Band number (0 for general, 1-5 for specific bands)
 * @param parameter - Parameter type
 * @param value - Parameter value
 * @param recalculate - Whether to recalculate filter coefficients
 * @returns GAIA packet
 */
export const setEQParameter = (
  band: number,
  parameter: (typeof ParameterTypes)[keyof typeof ParameterTypes],
  value: number,
  recalculate: boolean = false,
): GaiaPacket => {
  const PAYLOAD_LENGTH = 5;
  const ID_PARAMETER_HIGH_OFFSET = 0;
  const ID_PARAMETER_LOW_OFFSET = 1;
  const VALUE_OFFSET = 2;
  const VALUE_LENGTH = 2;
  const RECALCULATION_OFFSET = 4;

  const payload = new Array(PAYLOAD_LENGTH);
  payload[ID_PARAMETER_HIGH_OFFSET] = EQ_PARAMETER_FIRST_BYTE;
  payload[ID_PARAMETER_LOW_OFFSET] = buildParameterIDLowByte(band, parameter);

  // Convert value to 16-bit little-endian
  payload[VALUE_OFFSET] = value & 0xff;
  payload[VALUE_OFFSET + 1] = (value >> 8) & 0xff;

  payload[RECALCULATION_OFFSET] = recalculate ? 0x01 : 0x00;

  return createGaiaPacket(GAIA.COMMAND_SET_EQ_PARAMETER, payload);
};

/**
 * Get EQ parameter using COMMAND_GET_EQ_PARAMETER
 * @param band - Band number (0 for general, 1-5 for specific bands)
 * @param parameter - Parameter type
 * @returns GAIA packet
 */
export const getEQParameter = (
  band: number,
  parameter: (typeof ParameterTypes)[keyof typeof ParameterTypes],
): GaiaPacket => {
  const payload = [
    EQ_PARAMETER_FIRST_BYTE,
    buildParameterIDLowByte(band, parameter),
  ];
  return createGaiaPacket(GAIA.COMMAND_GET_EQ_PARAMETER, payload);
};

/**
 * Set master gain using COMMAND_SET_EQ_PARAMETER with GENERAL_BAND
 * @param gain - Gain value in dB (-12 to +12)
 * @returns GAIA packet
 */
export const setMasterGain = (gain: number): GaiaPacket => {
  // Clamp gain between -12 and +12 dB
  const clampedGain = Math.max(-12, Math.min(12, gain));

  // Convert to GAIA format (0-24 range, where 12 = 0dB)
  const gaiaValue = clampedGain + 12;

  return setEQParameter(GENERAL_BAND, ParameterTypes.GAIN, gaiaValue, true);
};

/**
 * Get master gain
 * @returns GAIA packet
 */
export const getMasterGain = (): GaiaPacket => {
  return getEQParameter(GENERAL_BAND, ParameterTypes.GAIN);
};

/**
 * Set band filter type
 * @param band - Band number (1-5)
 * @param filterType - Filter type from FilterTypes
 * @returns GAIA packet
 */
export const setBandFilter = (
  band: number,
  filterType: (typeof FilterTypes)[keyof typeof FilterTypes],
): GaiaPacket => {
  return setEQParameter(band, ParameterTypes.FILTER, filterType, true);
};

/**
 * Set band frequency
 * @param band - Band number (1-5)
 * @param frequency - Frequency in Hz
 * @returns GAIA packet
 */
export const setBandFrequency = (
  band: number,
  frequency: number,
): GaiaPacket => {
  const gaiaValue = frequencyToGaia(frequency);
  return setEQParameter(band, ParameterTypes.FREQUENCY, gaiaValue, true);
};

/**
 * Set band gain
 * @param band - Band number (1-5)
 * @param gain - Gain in dB
 * @returns GAIA packet
 */
export const setBandGain = (band: number, gain: number): GaiaPacket => {
  const gaiaValue = gainToGaia(gain);
  return setEQParameter(band, ParameterTypes.GAIN, gaiaValue, true);
};

/**
 * Set band quality
 * @param band - Band number (1-5)
 * @param quality - Quality value
 * @returns GAIA packet
 */
export const setBandQuality = (band: number, quality: number): GaiaPacket => {
  const gaiaValue = qualityToGaia(quality);
  return setEQParameter(band, ParameterTypes.QUALITY, gaiaValue, true);
};

/**
 * Parse GAIA response packet
 * @param packet - Received GAIA packet
 * @returns Parsed response
 */
export const parseGaiaResponse = (packet: number[]) => {
  if (packet.length < 7) {
    throw new Error('Invalid GAIA packet: too short');
  }

  const vendorId = packet[3] | (packet[4] << 8);
  const command = packet[5] | (packet[6] << 8);
  const payload = packet.slice(7);

  return {
    vendorId,
    command,
    payload,
  };
};

/**
 * Check if GAIA response is successful
 * @param packet - GAIA response packet
 * @returns True if successful
 */
export const isGaiaResponseSuccessful = (packet: number[]): boolean => {
  try {
    const response = parseGaiaResponse(packet);
    return response.payload.length > 0 && response.payload[0] === 0x00;
  } catch (error) {
    return false;
  }
};

/**
 * Convert frequency to GAIA format (exactly as in the Java implementation)
 * @param frequency - Frequency in Hz
 * @returns GAIA frequency value
 */
export const frequencyToGaia = (frequency: number): number => {
  // GAIA uses a logarithmic scale for frequency
  const minFreq = 20;
  const maxFreq = 20000;
  const logMin = Math.log10(minFreq);
  const logMax = Math.log10(maxFreq);

  const normalizedFreq = Math.log10(frequency);
  const normalizedValue = (normalizedFreq - logMin) / (logMax - logMin);

  return Math.round(normalizedValue * 65535); // 16-bit value
};

/**
 * Convert GAIA frequency value to Hz
 * @param gaiaValue - GAIA frequency value
 * @returns Frequency in Hz
 */
export const gaiaToFrequency = (gaiaValue: number): number => {
  const minFreq = 20;
  const maxFreq = 20000;
  const logMin = Math.log10(minFreq);
  const logMax = Math.log10(maxFreq);

  const normalizedValue = gaiaValue / 65535;
  const logFreq = normalizedValue * (logMax - logMin) + logMin;

  return Math.pow(10, logFreq);
};

/**
 * Convert gain to GAIA format (exactly as in the Java implementation)
 * @param gain - Gain in dB (-12 to +12)
 * @returns GAIA gain value
 */
export const gainToGaia = (gain: number): number => {
  // GAIA uses 0-24 range where 12 = 0dB
  const clampedGain = Math.max(-12, Math.min(12, gain));
  return clampedGain + 12;
};

/**
 * Convert GAIA gain value to dB
 * @param gaiaValue - GAIA gain value
 * @returns Gain in dB
 */
export const gaiaToGain = (gaiaValue: number): number => {
  return gaiaValue - 12;
};

/**
 * Convert quality to GAIA format
 * @param quality - Quality value (0.25 to 8.0)
 * @returns GAIA quality value
 */
export const qualityToGaia = (quality: number): number => {
  // GAIA uses 0-255 range for quality
  const clampedQuality = Math.max(0.25, Math.min(8.0, quality));
  return Math.round((clampedQuality - 0.25) * (255 / 7.75));
};

/**
 * Convert GAIA quality value to quality
 * @param gaiaValue - GAIA quality value
 * @returns Quality value
 */
export const gaiaToQuality = (gaiaValue: number): number => {
  return (gaiaValue * 7.75) / 255 + 0.25;
};

// Legacy functions for backward compatibility
export const setUserEQParameter = setEQParameter;
export const getUserEQParameter = getEQParameter;

export default {
  GAIA,
  Controls,
  ParameterTypes,
  FilterTypes,
  NUMBER_OF_PRESETS,
  CUSTOMIZABLE_PRESET,
  GENERAL_BAND,
  PARAMETER_MASTER_GAIN,
  EQ_PARAMETER_FIRST_BYTE,
  createGaiaPacket,
  buildParameterIDLowByte,
  setPreset,
  getPreset,
  setControlActivation,
  getControlActivation,
  setEQParameter,
  getEQParameter,
  setMasterGain,
  getMasterGain,
  setBandFilter,
  setBandFrequency,
  setBandGain,
  setBandQuality,
  setUserEQParameter,
  getUserEQParameter,
  parseGaiaResponse,
  isGaiaResponseSuccessful,
  frequencyToGaia,
  gaiaToFrequency,
  gainToGaia,
  gaiaToGain,
  qualityToGaia,
  gaiaToQuality,
};
