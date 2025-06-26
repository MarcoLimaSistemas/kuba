import React, { useState, useEffect } from "react";
import { Text, StyleSheet, ScrollView, View, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

interface FilterEqualizerScreenProps {
  createGaiaMessage: (command: Buffer) => void;
}


const FILTER_TYPE_PEQ = 13; // Valor numérico do PEQ conforme Filter.java

interface EQBand {
  id: number;
  frequency: number;
  gain: number;
  quality: number;
}

const EqualizerGaia = ({ createGaiaMessage }: FilterEqualizerScreenProps) => {
  const [logs, setLogs] = useState<string[]>([]);

  // Estado para as 5 bandas do equalizador (todas PEQ)
  const [bands, setBands] = useState<EQBand[]>([
    { id: 1, frequency: 125, gain: 0, quality: 1.0 },
    { id: 2, frequency: 500, gain: 0, quality: 1.0 },
    { id: 3, frequency: 1000, gain: 0, quality: 1.0 },
    { id: 4, frequency: 4000, gain: 0, quality: 1.0 },
    { id: 5, frequency: 8000, gain: 0, quality: 1.0 }
  ]);

  const [activeBand, setActiveBand] = useState<number>(1);
  // Configurar todas as bandas como PEQ na inicialização
  useEffect(() => {

    bands.forEach(band => {
      sendEQParameter(band.id, "filterType", FILTER_TYPE_PEQ);
    });
    console.log("Inicialização: Todas as bandas configuradas como PEQ (13)");
  }, []);

  // Enviar comando GAIA SET_EQ_PARAMETER para parâmetro específico de uma banda
  const sendEQParameter = (
    bandId: number,
    parameter: "frequency" | "gain" | "quality" | "filterType",
    value: number
  ) => {
    // 1️⃣ Mapeamento de parameterType e função de escala por parâmetro
    const paramConfig: Record<
      string,
      { type: number; scale: (v: number) => number }
    > = {
      filterType: {
        type: 0x00,
        scale: v => v,
      },
      frequency: {
        type: 0x01,
        // escala ×1000 conforme GAIA
        scale: v => Math.round(v * 1000),
      },
      gain: {
        type: 0x02,
        // escala ×60 (pode ajustar para 300 se quiser mais impacto)
        scale: v => {
          const s = Math.round(v * 60);
          return s < 0 ? 0x1000 + s : s;
        },
      },
      quality: {
        type: 0x03,
        // escala ×4096
        scale: v => Math.round(v * 4096),
      },
    };

    const cfg = paramConfig[parameter];
    if (!cfg) return console.error("Parâmetro inválido:", parameter);

    const parameterType = cfg.type;
    const scaledValue = cfg.scale(value);

    // 2️⃣ Monta o Parameter ID
    const parameterId = (bandId << 4) | parameterType;

    // 3️⃣ Constrói o comando GAIA
    const command = Buffer.from([
      0xFF, 0x01, 0x00, 0x05,       // header
      0x00, 0x0A,                   // vendor
      0x02, 0x1A,                   // SET_EQ_PARAMETER
      0x01,                         // bank
      parameterId,                  // band<<4 | paramType
      (scaledValue >> 8) & 0xff,    // msb
      scaledValue & 0xff,           // lsb
      0x01,                         // recalc flag
    ]);

    // 4️⃣ Log e envio
    const log = `SET_EQ_PARAMETER band=${bandId} ${parameter}=${value} → ${command.toString("hex")}`;
    console.log(log);
    setLogs(l => [log, ...l].slice(0, 5));
    createGaiaMessage(command);

    // 5️⃣ Se for frequency, reenvia gain e quality
    if (parameter === "frequency") {
      const band = bands.find(b => b.id === bandId)!;
      setTimeout(() => {
        sendEQParameter(bandId, "gain", band.gain);
        sendEQParameter(bandId, "quality", band.quality);
      }, 50);
    }
  };


  // Atualizar parâmetro de uma banda específica
  const handleParameterChange = (bandId: number, parameter: "frequency" | "gain" | "quality", value: number) => {
    setBands(prevBands =>
      prevBands.map(band =>
        band.id === bandId
          ? { ...band, [parameter]: value }
          : band
      )
    );
    sendEQParameter(bandId, parameter, value);
  };

  // Obter banda atual
  const getCurrentBand = () => {
    return bands.find(band => band.id === activeBand) || bands[0];
  };

  const currentBand = getCurrentBand();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header com seleção de bandas */}
      <View style={styles.bandsHeader}>
        <Text style={styles.bandsTitle}>Bands</Text>
        <View style={styles.bandsSelector}>
          {bands.map((band) => (
            <TouchableOpacity
              key={band.id}
              style={[
                styles.bandButton,
                activeBand === band.id && styles.activeBandButton
              ]}
              onPress={() => setActiveBand(band.id)}
            >
              <Text style={[
                styles.bandButtonText,
                activeBand === band.id && styles.activeBandButtonText
              ]}>
                BAND {band.id}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Controles da banda ativa */}
      <View style={styles.controlsContainer}>
        {/* Frequência */}
        <View style={styles.parameterContainer}>
          <Text style={styles.parameterLabel}>Frequência</Text>
          <Text style={styles.parameterValue}>{currentBand.frequency.toFixed(0)} Hz</Text>
          <Slider
            style={styles.slider}
            minimumValue={20}
            maximumValue={20000}
            step={1}
            value={currentBand.frequency}
            onValueChange={(value) => handleParameterChange(activeBand, "frequency", value)}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#E0E0E0"

          />
        </View>

        {/* Ganho */}
        <View style={styles.parameterContainer}>
          <Text style={styles.parameterLabel}>Ganho</Text>
          <Text style={styles.parameterValue}>{currentBand.gain.toFixed(1)} dB</Text>
          <Slider
            style={styles.slider}
            minimumValue={-12}
            maximumValue={12}
            step={0.1}
            value={currentBand.gain}
            onValueChange={(value) => handleParameterChange(activeBand, "gain", value)}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#E0E0E0"

          />
        </View>

        {/* Qualidade */}
        <View style={styles.parameterContainer}>
          <Text style={styles.parameterLabel}>Qualidade</Text>
          <Text style={styles.parameterValue}>{currentBand.quality.toFixed(2)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0.25}
            maximumValue={8}
            step={0.01}
            value={currentBand.quality}
            onValueChange={(value) => handleParameterChange(activeBand, "quality", value)}
            minimumTrackTintColor="#000"
            maximumTrackTintColor="#E0E0E0"

          />
        </View>
      </View>


      <View style={styles.filterInfoContainer}>
        <Text style={styles.filterInfoText}>Filter Type: PEQ (Parametric Equalizer)</Text>
      </View>

      {/* Status das bandas */}
      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Status das Bandas (PEQ):</Text>
        {bands.map((band) => (
          <View key={band.id} style={styles.bandStatus}>
            <Text style={styles.bandStatusText}>
              Banda {band.id}: {band.frequency}Hz, {band.gain.toFixed(1)}dB, Q{band.quality.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.statusContainer}>
        <Text style={styles.statusTitle}>Logs:</Text>

        <Text style={styles.bandStatusText}>
          {logs.join('\n')}
        </Text>

      </View>
      <TouchableOpacity
        style={[
          styles.cleanButton,
        ]}
        onPress={() => {
          setLogs([]), setBands([
            { id: 1, frequency: 125, gain: 0, quality: 1.0 },
            { id: 2, frequency: 500, gain: 0, quality: 1.0 },
            { id: 3, frequency: 1000, gain: 0, quality: 1.0 },
            { id: 4, frequency: 4000, gain: 0, quality: 1.0 },
            { id: 5, frequency: 8000, gain: 0, quality: 1.0 }
          ])
        }}
      >
        <Text style={styles.filterInfoText}>{"Limpar"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  
  },
  bandsHeader: {
    marginBottom: 30,
  },
  bandsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bandsSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bandButton: {
    flex: 1,
    marginHorizontal: 2,
    paddingVertical: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',
  },
  activeBandButton: {
    backgroundColor: '#000',
  },

  bandButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
  },
  activeBandButtonText: {
    color: '#FFF',
  },
  cleanButton: {
    flex: 1,
    marginHorizontal: 2,
    paddingVertical: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    alignItems: 'center',

  },
  controlsContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  parameterContainer: {
    marginBottom: 25,
  },
  parameterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  parameterValue: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'right',
  },
  slider: {
    width: '100%',
    height: 40,

  },

  filterInfoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  filterInfoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  statusContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bandStatus: {
    marginBottom: 5,
  },
  bandStatusText: {
    fontSize: 12,
    color: '#666',
  },
});

export default EqualizerGaia;