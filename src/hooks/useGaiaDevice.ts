import {useCallback} from 'react';
import {Buffer} from 'buffer';

export interface BluetoothDevice {
  write: (msg: Buffer) => Promise<void>;
  read: () => Promise<Buffer>;
  available: () => Promise<number>;
  disconnect: () => Promise<boolean>;
  onDataReceived: (callback: (data: Buffer) => void) => {remove: () => void};
}

export interface UseGaiaDeviceProps {
  device: BluetoothDevice;
}

export const useGaiaDevice = ({device}: UseGaiaDeviceProps) => {
  // Enviar comando GAIA via device.write
  const sendGaiaCommand = useCallback(
    async (command: Buffer) => {
      try {
        await device.write(command);
        console.log('GAIA command sent:', command.toString('hex'));
        return true;
      } catch (error) {
        console.error('Error sending GAIA command:', error);
        return false;
      }
    },
    [device],
  );

  // Criar comando GAIA SET_EQ_PARAMETER
  const createSetEQParameterCommand = useCallback(
    (
      bandId: number,
      parameter: 'frequency' | 'gain' | 'quality' | 'filterType',
      value: number,
    ): Buffer => {
      const paramConfig: Record<
        string,
        {type: number; scale: (v: number) => number}
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
      if (!cfg) {
        throw new Error(`Parâmetro inválido: ${parameter}`);
      }

      const parameterType = cfg.type;
      const scaledValue = cfg.scale(value);
      const parameterId = (bandId << 4) | parameterType;

      const command = Buffer.from([
        0xff,
        0x01,
        0x00,
        0x05, // header
        0x00,
        0x0a, // vendor
        0x02,
        0x1a, // SET_EQ_PARAMETER
        0x01, // bank
        parameterId, // band<<4 | paramType
        (scaledValue >> 8) & 0xff, // msb
        scaledValue & 0xff, // lsb
        0x01, // recalc flag
      ]);

      return command;
    },
    [],
  );

  // Enviar parâmetro de equalizer
  const sendEQParameter = useCallback(
    async (
      bandId: number,
      parameter: 'frequency' | 'gain' | 'quality' | 'filterType',
      value: number,
    ) => {
      try {
        const command = createSetEQParameterCommand(bandId, parameter, value);
        const success = await sendGaiaCommand(command);

        if (success) {
          console.log(
            `SET_EQ_PARAMETER band=${bandId} ${parameter}=${value} → ${command.toString('hex')}`,
          );
        }

        return success;
      } catch (error) {
        console.error('Error sending EQ parameter:', error);
        return false;
      }
    },
    [createSetEQParameterCommand, sendGaiaCommand],
  );

  // Enviar comando de preset
  const sendPresetCommand = useCallback(
    async (presetId: number) => {
      try {
        const command = Buffer.from([
          0xff,
          0x01,
          0x00,
          0x03, // header
          0x00,
          0x0a, // vendor
          0x02,
          0x01, // SET_EQ_CONTROL
          presetId, // preset ID
        ]);

        const success = await sendGaiaCommand(command);

        if (success) {
          console.log(
            `SET_EQ_CONTROL preset=${presetId} → ${command.toString('hex')}`,
          );
        }

        return success;
      } catch (error) {
        console.error('Error sending preset command:', error);
        return false;
      }
    },
    [sendGaiaCommand],
  );

  // Enviar comando de controle (Bass Boost, 3D Enhancement)
  const sendControlCommand = useCallback(
    async (control: 'bassBoost' | 'enhancement3D', enabled: boolean) => {
      try {
        const controlConfig = {
          bassBoost: 0x02,
          enhancement3D: 0x03,
        };

        const command = Buffer.from([
          0xff,
          0x01,
          0x00,
          0x03, // header
          0x00,
          0x0a, // vendor
          controlConfig[control], // command
          0x00, // bank
          enabled ? 0x01 : 0x00, // enable/disable
        ]);

        const success = await sendGaiaCommand(command);

        if (success) {
          console.log(
            `${control} ${enabled ? 'enabled' : 'disabled'} → ${command.toString('hex')}`,
          );
        }

        return success;
      } catch (error) {
        console.error('Error sending control command:', error);
        return false;
      }
    },
    [sendGaiaCommand],
  );

  // Enviar comando de Master Gain
  const sendMasterGainCommand = useCallback(
    async (gain: number) => {
      try {
        // Clamp gain between -12 and +12 dB
        const clampedGain = Math.max(-12, Math.min(12, gain));
        const gaiaValue = clampedGain + 12;

        const command = Buffer.from([
          0xff,
          0x01,
          0x00,
          0x03, // header
          0x00,
          0x0a, // vendor
          0x02,
          0x07, // SET_USER_EQ_CONTROL
          0x01, // bank
          gaiaValue, // gain value
        ]);

        const success = await sendGaiaCommand(command);

        if (success) {
          console.log(
            `Master Gain ${clampedGain}dB → ${command.toString('hex')}`,
          );
        }

        return success;
      } catch (error) {
        console.error('Error sending master gain command:', error);
        return false;
      }
    },
    [sendGaiaCommand],
  );

  // Ler resposta do dispositivo
  const readResponse = useCallback(async (): Promise<Buffer | null> => {
    try {
      const available = await device.available();
      if (available > 0) {
        const response = await device.read();
        console.log('Response received:', response.toString('hex'));
        return response;
      }
      return null;
    } catch (error) {
      console.error('Error reading response:', error);
      return null;
    }
  }, [device]);

  return {
    sendGaiaCommand,
    sendEQParameter,
    sendPresetCommand,
    sendControlCommand,
    sendMasterGainCommand,
    readResponse,
    createSetEQParameterCommand,
  };
};
