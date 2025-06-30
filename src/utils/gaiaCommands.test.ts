/**
 * Test file for GAIA Commands
 * This file helps verify that the GAIA commands match the Java implementation
 */

import {
  GAIA,
  Controls,
  ParameterTypes,
  FilterTypes,
  createGaiaPacket,
  buildParameterIDLowByte,
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
} from './gaiaCommands';

// Test function to verify GAIA commands
export const testGaiaCommands = () => {
  console.log('=== GAIA Commands Test ===');

  // Test 1: Verify GAIA constants match Java implementation
  console.log('1. GAIA Constants:');
  console.log('VENDOR_QUALCOMM:', GAIA.VENDOR_QUALCOMM.toString(16)); // Should be 0x000A
  console.log(
    'COMMAND_SET_EQ_CONTROL:',
    GAIA.COMMAND_SET_EQ_CONTROL.toString(16),
  ); // Should be 0x0214
  console.log(
    'COMMAND_GET_EQ_CONTROL:',
    GAIA.COMMAND_GET_EQ_CONTROL.toString(16),
  ); // Should be 0x0294
  console.log(
    'COMMAND_SET_EQ_PARAMETER:',
    GAIA.COMMAND_SET_EQ_PARAMETER.toString(16),
  ); // Should be 0x021A
  console.log(
    'COMMAND_GET_EQ_PARAMETER:',
    GAIA.COMMAND_GET_EQ_PARAMETER.toString(16),
  ); // Should be 0x029A

  // Test 2: Verify parameter types match Java implementation
  console.log('\n2. Parameter Types:');
  console.log('FILTER:', ParameterTypes.FILTER); // Should be 0
  console.log('FREQUENCY:', ParameterTypes.FREQUENCY); // Should be 1
  console.log('GAIN:', ParameterTypes.GAIN); // Should be 2
  console.log('QUALITY:', ParameterTypes.QUALITY); // Should be 3

  // Test 3: Verify filter types match Java implementation
  console.log('\n3. Filter Types:');
  console.log('BYPASS:', FilterTypes.BYPASS); // Should be 0
  console.log('PARAMETRIC_EQUALIZER:', FilterTypes.PARAMETRIC_EQUALIZER); // Should be 13

  // Test 4: Test buildParameterIDLowByte function
  console.log('\n4. Parameter ID Low Byte:');
  console.log(
    'Band 1, Parameter GAIN:',
    buildParameterIDLowByte(1, ParameterTypes.GAIN).toString(16),
  ); // Should be 0x12
  console.log(
    'Band 2, Parameter FREQUENCY:',
    buildParameterIDLowByte(2, ParameterTypes.FREQUENCY).toString(16),
  ); // Should be 0x21

  // Test 5: Test setPreset command
  console.log('\n5. Set Preset Command:');
  const presetPacket = setPreset(1);
  console.log(
    'Preset 1 packet:',
    presetPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  // Test 6: Test setControlActivation command
  console.log('\n6. Set Control Activation:');
  const bassBoostPacket = setControlActivation(Controls.BASS_BOOST, true);
  console.log(
    'Bass Boost ON packet:',
    bassBoostPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  // Test 7: Test setEQParameter command
  console.log('\n7. Set EQ Parameter:');
  const eqParamPacket = setEQParameter(1, ParameterTypes.GAIN, 12, true);
  console.log(
    'Band 1 Gain +12dB packet:',
    eqParamPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  // Test 8: Test setMasterGain command
  console.log('\n8. Set Master Gain:');
  const masterGainPacket = setMasterGain(6);
  console.log(
    'Master Gain +6dB packet:',
    masterGainPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  // Test 9: Test value conversions
  console.log('\n9. Value Conversions:');
  console.log('Frequency 1000Hz to GAIA:', frequencyToGaia(1000));
  console.log('Gain +6dB to GAIA:', gainToGaia(6));
  console.log('Quality 1.0 to GAIA:', qualityToGaia(1.0));

  // Test 10: Test band-specific commands
  console.log('\n10. Band Commands:');
  const bandFilterPacket = setBandFilter(1, FilterTypes.PARAMETRIC_EQUALIZER);
  console.log(
    'Band 1 Filter Parametric packet:',
    bandFilterPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  const bandFreqPacket = setBandFrequency(1, 1000);
  console.log(
    'Band 1 Frequency 1000Hz packet:',
    bandFreqPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  const bandGainPacket = setBandGain(1, 6);
  console.log(
    'Band 1 Gain +6dB packet:',
    bandGainPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  const bandQualityPacket = setBandQuality(1, 1.0);
  console.log(
    'Band 1 Quality 1.0 packet:',
    bandQualityPacket.raw.map(b => b.toString(16).padStart(2, '0')).join(' '),
  );

  console.log('\n=== Test Complete ===');
};

// Expected packet structures based on Java implementation
export const expectedPacketStructures = {
  setPreset: {
    command: 0x0214,
    payload: [0x01], // Preset 1
    raw: [0x00, 0x05, 0x00, 0x0a, 0x00, 0x14, 0x02, 0x01], // Start, Length, Vendor, Command, Payload
  },
  setBassBoost: {
    command: 0x0215,
    payload: [0x01], // Enable
    raw: [0x00, 0x05, 0x00, 0x0a, 0x00, 0x15, 0x02, 0x01], // Start, Length, Vendor, Command, Payload
  },
  setEQParameter: {
    command: 0x021a,
    payload: [0x01, 0x12, 0x0c, 0x00, 0x01], // Bank, ParamID, Value, Recalc
    raw: [
      0x00, 0x09, 0x00, 0x0a, 0x00, 0x1a, 0x02, 0x01, 0x12, 0x0c, 0x00, 0x01,
    ],
  },
};

// Function to compare packets with expected values
export const comparePackets = (
  actual: any,
  expected: any,
  testName: string,
) => {
  console.log(`\n${testName}:`);
  console.log(
    'Expected:',
    expected.raw.map((b: number) => b.toString(16).padStart(2, '0')).join(' '),
  );
  console.log(
    'Actual:  ',
    actual.raw.map((b: number) => b.toString(16).padStart(2, '0')).join(' '),
  );
  console.log(
    'Match:',
    JSON.stringify(actual.raw) === JSON.stringify(expected.raw),
  );
};

// Run tests
if (typeof window !== 'undefined') {
  // Browser environment
  (window as any).testGaiaCommands = testGaiaCommands;
  (window as any).comparePackets = comparePackets;
} else {
  // Node.js environment
  testGaiaCommands();
}
