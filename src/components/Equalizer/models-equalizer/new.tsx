import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import Slider from "@react-native-community/slider";

const bands = [
  { id: 1, label: "125 Hz", frequency: 125 },
  { id: 2, label: "250 Hz", frequency: 250 },
  { id: 3, label: "500 Hz", frequency: 500 },
  { id: 4, label: "1 kHz", frequency: 1000 },
  { id: 5, label: "2 kHz", frequency: 2000 },
  { id: 6, label: "4 kHz", frequency: 4000 },
  { id: 7, label: "8 kHz", frequency: 8000 },
  { id: 8, label: "16 kHz", frequency: 16000 },
];






interface FilterEqualizerScreenProps {
  createGaiaMessage: (command: Buffer) => void;

}
//1)
//QualityCommand: ff010005000a021a0101114801
// Sending EQ command: ff010005000a021a0101000001
//FrequencyCommand: ff010005000a021a0101e84801
//ff010007000a021b01e8480f881148


//125hz G:3 Q:8
//ff010005000a021a0112800001

//125hz G:0 Q:8
//ff010005000a021a0110000001

//125hz G:0 Q:8
//ff010005000a021a0112800001

//250hz G:0 Q:8
//ff010005000a021a0122800001

// GAIA Protocol Constants



const EqualizerNew = ({ createGaiaMessage }: FilterEqualizerScreenProps) => {
  const [settings, setSettings] = useState(
    bands.map(() => ({ gain: 0, quality: 1 }))
  );

  // ✅ Configuração da Banda única usada no EQ
  const BAND_ID = 1; // Usamos apenas uma banda para ajuste

  // ✅ Enviar Comando GAIA (0x021A) para uma única banda
  const sendEQParameter = (parameter: "frequency" | "gain" | "quality", value: number) => {
    let parameterType;
    let scaledValue;

    if (parameter === "gain") {
      parameterType = 0x02; // Tipo de parâmetro para ganho
      scaledValue = Math.round(value * 60);
      if (scaledValue < 0) scaledValue = 0x1000 + scaledValue; // Ajustar valores negativos
    } else if (parameter === "quality") {
      parameterType = 0x03; // Tipo de parâmetro para qualidade
      scaledValue = Math.round(value * 4096);
    } else {
      parameterType = 0x01; // Tipo de parâmetro para frequência
      scaledValue = Math.round(value * 1000);
    }

    // Criar identificador da banda + parâmetro
    const parameterId = (BAND_ID << 4) | parameterType;

    const command = Buffer.from([
      0xFF, // Start frame
      0x01, // Protocol version
      0x00, // Flags
      0x05, // Payload length
      0x00, 0x0A, // Vendor ID
      0x02, 0x1A, // Command ID (Set EQ Parameter)
      0x01, // Bank ID
      parameterId, // Banda + Parâmetro
      (scaledValue >> 8) & 0xFF, // Value MSB
      scaledValue & 0xFF, // Value LSB
      0x01 // Ativação do Banco de Equalização
    ]);

    console.log(`Enviando ${parameter.toUpperCase()}: ${value} → ${command.toString("hex")}`);
    createGaiaMessage(command);
  };
  const [frequency, setFrequency] = useState(1000); // Hz
  const [gain, setGain] = useState(0); // dB
  const [quality, setQuality] = useState(1.0); // Q-Factor
  const handleSliderChange = (type: "frequency" | "gain" | "quality", value: number) => {
    if (type === "frequency") {
      setFrequency(value);
    } else if (type === "gain") {
      setGain(value);
    } else {
      setQuality(value);
    }
    sendEQParameter(type, value);
  };




  //   const createEQCommand = (filterId: number, gainValue: number): Buffer => {
  //     // Convert gain from dB to the appropriate value range (-12dB to +12dB)
  //     const scaledGain = Math.round(Math.max(-12, Math.min(12, gainValue)) * 60);
  //     let value = scaledGain;
  //     if (scaledGain < 0) {
  //       value = 0x1000 + scaledGain; // Convert negative values to 2's complement
  //     }

  //     // Create command buffer exactly matching the format:
  //     const command = Buffer.from([
  //       0xFF, // Start frame
  //       0x01, // Protocol version
  //       0x00, // Flags (no checksum)
  //       0x05, // Payload length (fixed)
  //       0x00, // Length MSB
  //       0x0A, // Vendor ID
  //       0x02, // Command ID MSB
  //       0x1A, // Command ID LSB
  //       0x01, // Command parameter
  //       filterId, // Filter ID
  //       (value >> 8) & 0xFF, // Gain value MSB
  //       value & 0xFF, // Gain value LSB
  //       0x01 // Final parameter
  //     ]);

  //     return command;
  //   };
  //   const createFrequencyCommand = (filterId: number, frequencyValue: number): Buffer => {
  //     // Converter frequência para escala correta (em Hz multiplicado por 1000)
  //     const scaledFreq = Math.round(frequencyValue * 1000); // Correção: multiplicação correta

  //     return Buffer.from([
  //       0xFF, 0x01, 0x00, 0x05, 0x00, 0x0A, 0x02, 0x1A, 
  //       0x01, filterId, // ID do filtro
  //       (scaledFreq >> 8) & 0xFF, // Frequency MSB
  //       scaledFreq & 0xFF, // Frequency LSB
  //       0x01 // Finalização
  //     ]);
  //   };


  //   const createQualityCommand = (filterId: number, qualityValue: number): Buffer => {
  //     // Converter qualidade para escala correta (multiplicado por 4096)
  //     const scaledQuality = Math.round(qualityValue * 4096); // Correção: multiplicação correta

  //     return Buffer.from([
  //       0xFF, 0x01, 0x00, 0x05, 0x00, 0x0A, 0x02, 0x1A, 
  //       0x01, filterId, // ID do filtro
  //       (scaledQuality >> 8) & 0xFF, // Quality MSB
  //       scaledQuality & 0xFF, // Quality LSB
  //       0x01 // Finalização
  //     ]);
  //   };


  //   const sendEQParameter = (filterId: number, gain: number) => {
  //     try {
  //       const command = createEQCommand(filterId, gain);
  //     console.warn('Sending EQ command:', command.toString('hex'));

  //       // Here you would send the command via Bluetooth
  //       createGaiaMessage(command)
  //     } catch (error) {
  //       console.error('Error sending EQ command:', error);
  //     }

  //   };
  //   const sendFrequency = (filterId: number, frequency: number) => {
  //     const command = createFrequencyCommand(filterId, frequency);
  //        console.warn('FrequencyCommand:', command.toString('hex'));
  //     createGaiaMessage(command)
  //   };

  //   const sendQuality = (filterId: number, quality: number) => {
  //     const command = createQualityCommand(filterId, quality);
  //     console.warn('QualityCommand:', command.toString('hex'));
  //     createGaiaMessage(command)
  //   };

  //   const handleSliderChange = (index: number, type: "gain" | "quality", value: number) => {
  //     const updatedSettings = [...settings];
  //     updatedSettings[index][type] = value;
  //     setSettings(updatedSettings);

  // const frequency = bands[index].frequency;
  // //Alert.alert("Info",`${frequency}`)
  // sendFrequency(1, frequency);

  //     if (type === "gain") {
  //       // Only send EQ command for gain changes
  //       sendEQParameter(1, value);
  //     }
  //     if (type === "quality") {
  //       sendQuality(1,value)
  //     }
  //   };
  return (
    <ScrollView contentContainerStyle={styles.container} >
      {/* <Text style={{color:"#000"}}>{commandText}</Text> */}


      <Text style={{ color: "#000" }}>Frequência: {frequency.toFixed(0)} Hz</Text>
      <Slider
        style={styles.slider}
        minimumValue={20}
        maximumValue={20000}
        step={10}
        value={frequency}
        onValueChange={(value) => handleSliderChange("frequency", value)}
      />
      {/* Ganho */}
      <Text style={{ color: "#000" }}>Ganho: {gain.toFixed(1)} dB</Text>
      <Slider
        style={styles.slider}
        minimumValue={-12}
        maximumValue={12}
        step={0.1}
        value={gain}
        onValueChange={(value) => handleSliderChange("gain", value)}
      />

      {/* Qualidade */}
      <Text style={{ color: "#000" }}>Qualidade: {quality.toFixed(2)}</Text>
      <Slider
        style={styles.slider}
        minimumValue={0.25}
        maximumValue={8}
        step={0.01}
        value={quality}
        onValueChange={(value) => handleSliderChange("quality", value)}
      />
      {/* {bands.map((freq, index) => (
      <View key={freq.frequency} style={styles.sliderContainer}>
        <Text style={styles.label}>{freq.label}</Text>
        <Text style={{color:"#000"}} >Ganho: {settings[index].gain} dB</Text>
        <Slider
          style={styles.slider}
          minimumValue={-12}
          maximumValue={12}
          step={0.5}
          value={settings[index].gain}
          onValueChange={(value) => handleSliderChange(index, "gain", value)}
        />
        <Text style={{color:"#000"}}>Qualidade: {settings[index].quality.toFixed(2)}</Text>
     
      <Slider
          style={styles.slider}
          minimumValue={0.25}
          maximumValue={8}
          step={0.01}
          value={settings[index].quality}
          onValueChange={(value) => handleSliderChange(index, "quality", value)}
        />
      </View>
    ))} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {

    padding: 10,
  },
  sliderContainer: {
    alignItems: "center",
    marginHorizontal: 10,
    width: "100%",
  },
  label: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  slider: {
    width: "100%",
    height: 40,

  },
});

export default EqualizerNew;