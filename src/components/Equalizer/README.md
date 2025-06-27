# Equalizer GAIA para Kuba-cli-app

Este é um equalizer adaptado do exemplo GAIA Control Android SDK para o projeto Kuba-cli-app.

## Componentes

### 1. `gaiaCommands.ts`

Utilitários para criar e gerenciar comandos GAIA:

- Criação de pacotes GAIA
- Comandos para presets, controles e parâmetros
- Conversão de valores para formato GAIA
- Parsing de respostas GAIA

### 2. `useGaiaEqualizer.ts`

Hook personalizado para gerenciar o estado do equalizer GAIA:

- Estado do equalizer (presets, controles, bandas)
- Funções para modificar parâmetros
- Integração com comandos GAIA
- Reset e carregamento de presets

### 3. `GaiaEqualizer.tsx`

Componente de interface do equalizer GAIA:

- Interface visual com presets
- Controles de Bass Boost e 3D Enhancement
- Sliders para bandas de frequência
- Controle de Master Gain

### 4. `EqualizerWrapper.tsx`

Wrapper que permite alternar entre o equalizer original e o GAIA:

- Toggle entre modos
- Conversão de dados entre formatos
- Interface unificada

## Como usar

### 1. Importar o wrapper

```tsx
import {EqualizerWrapper} from '@components/Equalizer/EqualizerWrapper';
```

### 2. Implementar a função createGaiaMessage

```tsx
const createGaiaMessage = (command: Buffer) => {
  // Enviar comando GAIA para o dispositivo
  // Exemplo: via Bluetooth ou outra interface
  console.log('Enviando comando GAIA:', command);
};
```

### 3. Usar o componente

```tsx
<EqualizerWrapper
  createGaiaMessage={createGaiaMessage}
  handleScrollEnabled={handleScrollEnabled}
  handlePreset={handlePreset}
  handleFrequencies={handleFrequencies}
  handleModalEdit={handleModalEdit}
  onOpen={onOpen}
  disabled={disabled}
  frequenciesList={frequenciesList}
/>
```

## Funcionalidades

### Presets

- 7 presets pré-definidos (Flat, Custom, Bass, Treble, Rock, Jazz, Classical)
- Preset Custom permite configuração personalizada

### Controles

- **Bass Boost**: Ativa/desativa reforço de graves
- **3D Enhancement**: Ativa/desativa aprimoramento 3D
- **Presets**: Ativa/desativa uso de presets

### Bandas de Frequência

- 10 bandas de frequência (60Hz a 16kHz)
- Controle individual de ganho (-12dB a +12dB)
- Sliders verticais para cada banda

### Master Gain

- Controle de ganho geral (-12dB a +12dB)
- Slider horizontal

## Protocolo GAIA

O equalizer usa o protocolo GAIA da Qualcomm para comunicação com dispositivos de áudio:

### Comandos principais:

- `COMMAND_SET_EQ_CONTROL`: Define preset
- `COMMAND_SET_BASS_BOOST_CONTROL`: Controla Bass Boost
- `COMMAND_SET_3D_ENHANCEMENT_CONTROL`: Controla 3D Enhancement
- `COMMAND_SET_USER_EQ_PARAMETER`: Define parâmetros de banda

### Estrutura de pacote:

```
[Start][Length][Vendor][Command][Payload]
```

## Integração com dispositivo

Para integrar com um dispositivo real:

1. Implementar `createGaiaMessage` para enviar comandos
2. Implementar listener para respostas GAIA
3. Usar `parseGaiaResponse` para processar respostas
4. Verificar sucesso com `isGaiaResponseSuccessful`

## Exemplo de uso completo

```tsx
import React, {useState} from 'react';
import {EqualizerWrapper} from '@components/Equalizer/EqualizerWrapper';
import {Buffer} from 'buffer';

const DeviceScreen = () => {
  const [frequencies, setFrequencies] = useState([]);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const createGaiaMessage = (command: Buffer) => {
    // Implementar envio para dispositivo
    console.log('GAIA command:', command);
  };

  const handleScrollEnabled = (enabled: boolean) => {
    setScrollEnabled(enabled);
  };

  const handlePreset = (preset: any) => {
    console.log('Preset selecionado:', preset);
  };

  const handleFrequencies = (freqs: any[]) => {
    setFrequencies(freqs);
  };

  const handleModalEdit = (isEdit: boolean) => {
    console.log('Modal edit:', isEdit);
  };

  const onOpen = () => {
    console.log('Modal opened');
  };

  return (
    <EqualizerWrapper
      createGaiaMessage={createGaiaMessage}
      handleScrollEnabled={handleScrollEnabled}
      handlePreset={handlePreset}
      handleFrequencies={handleFrequencies}
      handleModalEdit={handleModalEdit}
      onOpen={onOpen}
      frequenciesList={frequencies}
    />
  );
};
```

## Notas

- O equalizer GAIA é compatível com dispositivos que suportam o protocolo GAIA
- Todos os valores são convertidos automaticamente para o formato GAIA
- O componente mantém compatibilidade com a interface existente
- O wrapper permite alternar facilmente entre os modos original e GAIA
