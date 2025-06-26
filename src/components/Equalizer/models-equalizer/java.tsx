import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import EqualizerSlider from '../../../screens/Client/Device/slider';


interface Settings {
  gain: number;
  quality: number;
}
interface FilterEqualizerScreenProps {
  createGaiaMessage: (command: Buffer) => void;

}

const EqualizerJava = ({ createGaiaMessage }: FilterEqualizerScreenProps) => {
  const [settings, setSettings] = useState<Record<number, Settings>>({
    125: { gain: 0, quality: 0 },
    1000: { gain: 0, quality: 0 },
    8000: { gain: 0, quality: 0 },
  });

  const handleValueChange = (frequency: number, type: 'gain' | 'quality', value: number) => {
    setSettings((prevSettings) => ({
      ...prevSettings,
      [frequency]: {
        ...prevSettings[frequency],
        [type]: value,
      },
    }));
    handleApplySettings()
  };
  // const sendGAIAPacket = (frequency: number, type: 'gain' | 'quality', value: number) => {
  //   const buffer = new ArrayBuffer(4);
  //   const view = new DataView(buffer);
  //   view.setUint16(0, frequency, true);
  //   view.setUint8(2, type === 'gain' ? 0 : 1);
  //   view.setInt8(3, value);

  //   // Implement the actual sending of the buffer to the headphones here
  //   console.log(`Enviando pacote GAIA: Frequência ${frequency}, ${type} ${value}`, buffer);
  //   // Example: Bluetooth or other communication method to send the buffer
  // };
  const sendGAIAPacket = (frequency: number, type: "gain" | "quality", value: number) => {
    // Mapeamento correto das frequências para as bandas GAIA
    const bandMapping: { [key: number]: number } = {
      125: 1,
      1000: 2,
      8000: 3,
    };

    const bandId = bandMapping[frequency];
    if (!bandId) {
      console.error("❌ Frequência não suportada no GAIA:", frequency);
      return;
    }

    // Determina o tipo de parâmetro
    const parameterType = type === "gain" ? 0x02 : 0x03; // 0x02 = Gain | 0x03 = Quality
    const parameterId = (bandId << 4) | parameterType; // Criação do ID do parâmetro GAIA

    // Conversão do valor para o formato correto
    let scaledValue;
    if (type === "gain") {
      scaledValue = Math.round(value * 300); // Ajustando para a escala correta
      if (value < 0) scaledValue = 0x1000 + scaledValue; // Ajuste para valores negativos
    } else {
      scaledValue = Math.round(value * 4096); // Qualidade multiplicada por 4096
    }

    // Montando o comando GAIA no formato correto
    const command = Buffer.from([
      0xFF, 0x01, 0x00, 0x05, // Header
      0x00, 0x0A, // Vendor ID (CSR)
      0x02, 0x1A, // Command ID (Set EQ Parameter)
      0x01, // Bank ID (Custom EQ)
      parameterId, // Banda + Parâmetro
      (scaledValue >> 8) & 0xff, // Valor MSB
      scaledValue & 0xff, // Valor LSB
      0x01, // Ativar equalização
    ]);

    console.log(`🎛️ Enviando Comando GAIA: Frequência ${frequency} Hz, ${type} ${value} → ${command.toString("hex")}`);

    // Simula envio via Bluetooth (substitua pela função real)
    createGaiaMessage(command);
  };

  const handleApplySettings = () => {
    Object.keys(settings).forEach((frequency) => {
      const freq = parseInt(frequency);
      const { gain, quality } = settings[freq];
      sendGAIAPacket(freq, 'gain', gain);
      sendGAIAPacket(freq, 'quality', quality);
    });
  };

  return (
    <View style={styles.container}>
      {Object.keys(settings).map((frequency) => {
        const freq = parseInt(frequency);
        return (
          <View key={frequency} style={styles.frequencyContainer}>
            <Text style={styles.frequencyLabel}>{frequency} Hz</Text>
            <EqualizerSlider
              label="Ganho"
              value={settings[freq].gain}
              onValueChange={(value) => handleValueChange(freq, 'gain', value)}
            />
            <EqualizerSlider
              label="Qualidade"
              value={settings[freq].quality}
              onValueChange={(value) => handleValueChange(freq, 'quality', value)}
            />
          </View>
        );
      })}
      {/* <Button title="Aplicar Configurações" onPress={handleApplySettings} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  frequencyContainer: {
    marginBottom: 20,
  },
  frequencyLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default EqualizerJava;
