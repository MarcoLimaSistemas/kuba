// import React, { useState } from "react";
// import { View, Text, StyleSheet, ScrollView } from "react-native";
// import Slider from "@react-native-community/slider";
// import { Buffer } from "buffer";




interface FilterEqualizerScreenProps {
  createGaiaMessage: (command: Buffer) => void;

}


// const EqualizerTest = ({createGaiaMessage}:FilterEqualizerScreenProps) => {
//   // ✅ Definição das Bandas (Graves, Médios, Agudos)
  // const bands = [
  //   { id: 1, name: "Grave", defaultFreq: 125 },
  //   { id: 2, name: "Médio", defaultFreq: 1000 },
  //   { id: 3, name: "Agudo", defaultFreq: 8000 },
  // ];

//   // Estados para cada banda
//   const [settings, setSettings] = useState(
//     bands.map((band) => ({
//       frequency: band.defaultFreq,
//       gain: 0,
//       quality: 1.0,
//     }))
//   );


// // ✅ Enviar Comando GAIA (0x021A) para uma banda específica
// const sendEQParameter = (bandId: number, parameter: "frequency" | "gain" | "quality", value: number) => {
//   try {
//     let parameterType;
//     let scaledValue;

//     if (parameter === "gain") {
//       parameterType = 0x02;
//       scaledValue = Math.round(value * 300);
//       if (scaledValue < 0) scaledValue = 0x1000 + scaledValue;
//     } else if (parameter === "quality") {
//       parameterType = 0x03;
//       scaledValue = Math.round(value * 4096);
//     } else if (parameter === "frequency") {
//       parameterType = 0x01;
//       scaledValue = Math.round(value * 1000);
//     } else {
//       throw new Error("Invalid parameter type");
//     }

//     // Create parameter ID by combining band ID and parameter type
//     const parameterId = (bandId << 4) | parameterType;

//     const command = Buffer.from([
//       0xFF, 0x01, 0x00, 0x05, // Header
//       0x00, 0x0A, // Vendor ID
//       0x02, 0x1A, // Command ID (Set EQ Parameter)
//       0x01, // Bank ID
//       parameterId, // Band + Parameter
//       (scaledValue >> 8) & 0xFF, // Value MSB
//       scaledValue & 0xFF, // Value LSB
//       0x01, // Bank Activation
//     ]);

//     console.log(`🔥 Band ${bandId} - ${parameter.toUpperCase()}: ${value} → ${command.toString("hex")}`);
//     console.warn(
//       `Bass Gain Diagnostic`,
//       `Raw Value: ${value}\nScaled Value: ${scaledValue}\nHex: 0x${scaledValue.toString(16)}`
//     );
//     // Here you would send the command via Bluetooth
//     // await BluetoothManager.sendData(command);
//     createGaiaMessage(command)
//   } catch (error) {
//     console.error('Error sending command:', error);
//   }

// };

//   const handleSliderChange = (index: number, type: "frequency" | "gain" | "quality", value: number) => {
//     const updatedSettings = [...settings];
//     updatedSettings[index][type] = value;
//     setSettings(updatedSettings);

//     const bandId = bands[index].id;
//     sendEQParameter(bandId, type, value);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Equalizador Multibanda</Text>

//       {bands.map((band, index) => (
//         <View key={band.id} style={styles.bandContainer}>
//           <Text style={{color:"#000"}}>{band.name}</Text>

//           {/* Frequência */}
//           <Text style={{color:"#000"}}>Frequência: {settings[index].frequency} Hz</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={20}
//             maximumValue={20000}
//             step={10}
//             value={settings[index].frequency}
//             onValueChange={(value) => handleSliderChange(index, "frequency", value)}
//           />

//           {/* Ganho */}
//           <Text style={{color:"#000"}}>Ganho: {settings[index].gain.toFixed(1)} dB</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={-36}
//             maximumValue={36}
//             step={0.1}
//             value={settings[index].gain}
//             onValueChange={(value) => handleSliderChange(index, "gain", value)}
//           />

//           {/* Qualidade */}
//           <Text style={{color:"#000"}}>Qualidade: {settings[index].quality.toFixed(2)}</Text>
//           <Slider
//             style={styles.slider}
//             minimumValue={0.25}
//             maximumValue={8}
//             step={0.01}
//             value={settings[index].quality}
//             onValueChange={(value) => handleSliderChange(index, "quality", value)}
//           />
//         </View>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {  padding: 20 },
//   title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   bandContainer: { marginBottom: 30, alignItems: "center" },

//   slider: {   width: "100%",
//     height: 40, },
// });

// export default EqualizerTest;
import React, { useState } from "react";
import { View, Text, StyleSheet, Platform, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker"; 
import { Buffer } from "buffer";
import { Button } from "@components/Button";




const  EqualizerTest = ({createGaiaMessage}:FilterEqualizerScreenProps) => {
  const bands = [
    { frequency: 125, id: 1 },
    { frequency: 1000, id: 2 },
    { frequency: 8000, id: 3 },
  ];
  
  // Função para enviar comandos GAIA
  const sendEQParameter = (
    bandId: number,
    parameter: "gain" | "quality",
    value: number
  ) => {
    let parameterType: number;
    let scaledValue: number;
  
    if (parameter === "gain") {
      parameterType = 0x02;
      scaledValue = Math.round(value * 300);
      if (value < 0) scaledValue = 0x1000 + scaledValue;
    } else if (parameter === "quality") {
      parameterType = 0x03;
      scaledValue = Math.round(value * 4096);
    } else {
      throw new Error("Parâmetro inválido!");
    }
  
    // ID do parâmetro: (Banda << 4) | Tipo de Parâmetro
    const parameterId = (bandId << 4) | parameterType;
  
    // Comando GAIA no formato correto
    const command = Buffer.from([
      0xFF, 0x01, 0x00, 0x05, // Cabeçalho
      0x00, 0x0A, // Vendor ID
      0x02, 0x1A, // Command ID (Set EQ Parameter)
      0x01, // Bank ID
      parameterId, // Banda + Parâmetro
      (scaledValue >> 8) & 0xff,
      scaledValue & 0xff,
      0x01, // Ativar Equalização
    ]);
  
    console.warn(
      `🎛 Banda ${bandId} - ${parameter.toUpperCase()}: ${value} → ${command.toString(
        "hex"
      )}`
    );
  createGaiaMessage(command);
    //  createBuffer(command);
  };
  
 // Estados para cada banda
 const [settings, setSettings] = useState(
  bands.map(() => ({ gain: 0, quality: 1.0 }))
);

const handleSliderChange = (index: number, type: "gain" | "quality", value: number) => {
  const updatedSettings = [...settings];
  updatedSettings[index][type] = value;
  setSettings(updatedSettings);

  // Enviar comando GAIA apenas para a banda alterada
  const bandId = bands[index].id;
  sendEQParameter(bandId, type, value);
};

const getBandFrequencies = () => {
  for (let bandId = 1; bandId <= 5; bandId++) {
    const parameterType = 0x01; // 0x01 = Frequência

    const parameterId = (bandId << 4) | parameterType;

    const command = Buffer.from([
      0xFF, 0x01, 0x00, 0x02, // Header
      0x00, 0x0A, // Vendor ID
      0x02, 0x1A, // Command ID (Get EQ Parameter)
      0x01, // Bank ID
      parameterId, // Banda + Tipo de Parâmetro (Frequência)
    ]);

    console.log(`📡 Pedindo a frequência da Banda ${bandId} → ${command.toString("hex")}`);
    createGaiaMessage(command);
  }
};

return (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.title}>Equalizador Multibanda</Text>
<Button title="Testar" onPress={() => getBandFrequencies()} />
    {bands.map((band, index) => (
      <View key={band.id} style={styles.bandContainer}>
        <Text style={styles.bandTitle}>{band.frequency} Hz</Text>

        {/* Ganho */}
        <Text  style={styles.pt}>Ganho: {settings[index].gain.toFixed(1)} dB</Text>
        <Slider
          style={styles.slider}
          minimumValue={-12}
          maximumValue={12}
          step={0.1}
          value={settings[index].gain}
          onValueChange={(value) => handleSliderChange(index, "gain", value)}
        />

        {/* Qualidade */}
        <Text style={styles.pt}>Qualidade (Q): {settings[index].quality.toFixed(2)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0.25}
          maximumValue={8}
          step={0.01}
          value={settings[index].quality}
          onValueChange={(value) => handleSliderChange(index, "quality", value)}
        />
      </View>
    ))}
  </ScrollView>
);
};

// Estilos
const styles = StyleSheet.create({
container: { flexGrow: 1, alignItems: "center", padding: 20 },
title: { fontSize: 20, fontWeight: "bold", marginBottom: 20,color:"#000" },
pt: { fontSize: 10, fontWeight: "bold", color:"#000" },
bandContainer: { marginBottom: 30, alignItems: "center",color:"#000" },
bandTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10,color:"#000" },
slider: { width: 300, height: 40, marginVertical: 10 },
});



export default  EqualizerTest;