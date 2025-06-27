/**
 * GAIA Commands for Equalizer Control
 * Adapted for Kuba-cli-app from GAIA Control Android SDK
 */

// GAIA Protocol Constants
export const GAIA = {
  VENDOR_QUALCOMM: 0x000d,
  COMMAND_GET_EQ_CONTROL: 0x0201,
  COMMAND_SET_EQ_CONTROL: 0x0202,
  COMMAND_GET_BASS_BOOST_CONTROL: 0x0203,
  COMMAND_SET_BASS_BOOST_CONTROL: 0x0204,
  COMMAND_GET_3D_ENHANCEMENT_CONTROL: 0x0205,
  COMMAND_SET_3D_ENHANCEMENT_CONTROL: 0x0206,
  COMMAND_GET_USER_EQ_CONTROL: 0x0207,
  COMMAND_SET_USER_EQ_CONTROL: 0x0208,
  COMMAND_GET_USER_EQ_GROUP: 0x0209,
  COMMAND_SET_USER_EQ_GROUP: 0x020a,
  COMMAND_GET_USER_EQ_PARAMETER: 0x020b,
  COMMAND_SET_USER_EQ_PARAMETER: 0x020c,
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

// Parameter Types
export const ParameterTypes = {
  FREQUENCY: 0,
  QUALITY: 1,
  GAIN: 2,
} as const;

export interface GaiaPacket {
  command: number;
  payload: number[];
  raw: number[];
}

/**
 * Create a GAIA packet
 * @param command - GAIA command
 * @param payload - Packet payload
 * @returns Complete GAIA packet
 */
export const createGaiaPacket = (
  command: number,
  payload: number[] = [],
): GaiaPacket => {
  const vendorId = GAIA.VENDOR_QUALCOMM;
  const packetLength = 4 + payload.length; // Header + payload

  const raw = [
    0x00, // Start byte
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
 * Set equalizer preset
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
 * Set control activation state
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
 * Set user EQ parameter
 * @param band - Band number (0-4)
 * @param parameter - Parameter type
 * @param value - Parameter value
 * @returns GAIA packet
 */
export const setUserEQParameter = (
  band: number,
  parameter: (typeof ParameterTypes)[keyof typeof ParameterTypes],
  value: number,
): GaiaPacket => {
  const payload = [band, parameter, value & 0xff, (value >> 8) & 0xff];
  return createGaiaPacket(GAIA.COMMAND_SET_USER_EQ_PARAMETER, payload);
};

/**
 * Get user EQ parameter
 * @param band - Band number (0-4)
 * @param parameter - Parameter type
 * @returns GAIA packet
 */
export const getUserEQParameter = (
  band: number,
  parameter: (typeof ParameterTypes)[keyof typeof ParameterTypes],
): GaiaPacket => {
  const payload = [band, parameter];
  return createGaiaPacket(GAIA.COMMAND_GET_USER_EQ_PARAMETER, payload);
};

/**
 * Set master gain
 * @param gain - Gain value in dB (-12 to +12)
 * @returns GAIA packet
 */
export const setMasterGain = (gain: number): GaiaPacket => {
  // Clamp gain between -12 and +12 dB
  const clampedGain = Math.max(-12, Math.min(12, gain));

  // Convert to GAIA format (0-24 range, where 12 = 0dB)
  const gaiaValue = clampedGain + 12;

  return createGaiaPacket(GAIA.COMMAND_SET_USER_EQ_CONTROL, [gaiaValue]);
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
 * Convert frequency to GAIA format
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
 * Convert gain to GAIA format
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

export default {
  GAIA,
  Controls,
  ParameterTypes,
  NUMBER_OF_PRESETS,
  CUSTOMIZABLE_PRESET,
  createGaiaPacket,
  setPreset,
  getPreset,
  setControlActivation,
  getControlActivation,
  setUserEQParameter,
  getUserEQParameter,
  setMasterGain,
  parseGaiaResponse,
  isGaiaResponseSuccessful,
  frequencyToGaia,
  gaiaToFrequency,
  gainToGaia,
  gaiaToGain,
};
