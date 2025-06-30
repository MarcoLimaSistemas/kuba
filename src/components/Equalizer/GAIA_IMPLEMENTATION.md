# GAIA Equalizer Implementation - Correções

## Problemas Identificados e Corrigidos

### 1. Comandos GAIA Incorretos

**Problema**: Os comandos usados no React Native não correspondiam aos comandos reais do protocolo GAIA.

**Correção**: Atualizados para corresponder exatamente ao arquivo `GAIA.java`:

```typescript
// ANTES (incorreto)
COMMAND_SET_EQ_CONTROL: 0x0202,
COMMAND_GET_EQ_CONTROL: 0x0201,

// DEPOIS (correto)
COMMAND_SET_EQ_CONTROL: 0x0214,
COMMAND_GET_EQ_CONTROL: 0x0294,
COMMAND_SET_EQ_PARAMETER: 0x021A,
COMMAND_GET_EQ_PARAMETER: 0x029A,
```

### 2. Vendor ID Incorreto

**Problema**: Vendor ID estava incorreto.

**Correção**:

```typescript
// ANTES
VENDOR_QUALCOMM: 0x000d,

// DEPOIS
VENDOR_QUALCOMM: 0x000A, // Exatamente como em GAIA.java
```

### 3. Estrutura de Pacotes Incorreta

**Problema**: A estrutura do pacote GAIA não seguia o protocolo correto.

**Correção**: Implementada estrutura exata do `CustomEqualizerGaiaManager.java`:

```typescript
// Estrutura correta do pacote COMMAND_SET_EQ_PARAMETER
const payload = [
  0x01, // EQ_PARAMETER_FIRST_BYTE
  buildParameterIDLowByte(band, parameter), // Parameter ID
  value & 0xff, // Value LSB
  (value >> 8) & 0xff, // Value MSB
  recalculate ? 0x01 : 0x00, // Recalculation flag
];
```

### 4. Parâmetros de Equalizer Incorretos

**Problema**: Os tipos de parâmetros não correspondiam ao `ParameterType.java`.

**Correção**:

```typescript
// ANTES
ParameterTypes = {
  FREQUENCY: 0,
  QUALITY: 1,
  GAIN: 2,
};

// DEPOIS (exato como ParameterType.java)
ParameterTypes = {
  FILTER: 0,
  FREQUENCY: 1,
  GAIN: 2,
  QUALITY: 3,
};
```

### 5. Falta de Tipos de Filtro

**Problema**: Não havia suporte para diferentes tipos de filtros.

**Correção**: Adicionados todos os tipos de filtro do `Filter.java`:

```typescript
FilterTypes = {
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
};
```

### 6. Construção de Parameter ID

**Problema**: A construção do Parameter ID não seguia a lógica do Java.

**Correção**: Implementada função exata do `CustomEqualizerGaiaManager.java`:

```typescript
export const buildParameterIDLowByte = (
  band: number,
  parameter: number,
): number => {
  return (band << 4) | parameter;
};
```

### 7. Conversões de Valores Incorretas

**Problema**: As conversões de frequência e ganho não seguiam o padrão GAIA.

**Correção**: Implementadas conversões corretas:

```typescript
// Frequência: escala logarítmica 20Hz-20kHz para 0-65535
export const frequencyToGaia = (frequency: number): number => {
  const minFreq = 20;
  const maxFreq = 20000;
  const logMin = Math.log10(minFreq);
  const logMax = Math.log10(maxFreq);
  const normalizedFreq = Math.log10(frequency);
  const normalizedValue = (normalizedFreq - logMin) / (logMax - logMin);
  return Math.round(normalizedValue * 65535);
};

// Ganho: -12dB a +12dB para 0-24 (onde 12 = 0dB)
export const gainToGaia = (gain: number): number => {
  const clampedGain = Math.max(-12, Math.min(12, gain));
  return clampedGain + 12;
};
```

### 8. Número de Bandas

**Problema**: O equalizer estava usando 10 bandas, mas o protocolo GAIA usa 5 bandas.

**Correção**: Ajustado para 5 bandas conforme o protocolo GAIA:

```typescript
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
```

## Estrutura de Pacotes GAIA Correta

### Pacote COMMAND_SET_EQ_PARAMETER

```
[0x00] - Start byte
[0x09] - Length LSB (9 bytes)
[0x00] - Length MSB
[0x0A] - Vendor ID LSB (Qualcomm)
[0x00] - Vendor ID MSB
[0x1A] - Command LSB (COMMAND_SET_EQ_PARAMETER)
[0x02] - Command MSB
[0x01] - EQ_PARAMETER_FIRST_BYTE (bank 1)
[0x12] - Parameter ID Low Byte (band 1, parameter GAIN)
[0x0C] - Value LSB (12 = 0dB)
[0x00] - Value MSB
[0x01] - Recalculation flag (1 = recalculate)
```

### Pacote COMMAND_SET_EQ_CONTROL

```
[0x00] - Start byte
[0x05] - Length LSB (5 bytes)
[0x00] - Length MSB
[0x0A] - Vendor ID LSB (Qualcomm)
[0x00] - Vendor ID MSB
[0x14] - Command LSB (COMMAND_SET_EQ_CONTROL)
[0x02] - Command MSB
[0x01] - Preset number
```

## Testes Implementados

Foi criado um arquivo de teste (`gaiaCommands.test.ts`) que verifica:

1. Constantes GAIA corretas
2. Tipos de parâmetros
3. Tipos de filtros
4. Construção de Parameter ID
5. Estrutura de pacotes
6. Conversões de valores

## Verificação da Lógica

A implementação agora segue exatamente:

- `GAIA.java` - Comandos e constantes
- `ParameterType.java` - Tipos de parâmetros
- `Filter.java` - Tipos de filtros
- `CustomEqualizerGaiaManager.java` - Lógica de construção de pacotes

Todos os comandos enviados por Bluetooth agora são idênticos aos do projeto Java original.
