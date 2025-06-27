import { IBandSettings } from '@models/band';
import { DeviceEventEmitter } from 'react-native';

  export const sendEQParametersSequentially = (newArray: IBandSettings[]) => {
    newArray.forEach((band) => {

      const bandId = band.id;

      const typeFrequency = 'frequency';
      const typeGain = 'gain';
      const typeQuality = 'quality';

      const frequency = band.frequency;
      const gain = band.gain;
      const quality = band.quality;



      DeviceEventEmitter.emit('onEventEqualizer', { bandId, type: typeFrequency, value: frequency });
      DeviceEventEmitter.emit('onEventEqualizer', { bandId, type: typeGain, value: gain });
      DeviceEventEmitter.emit('onEventEqualizer', { bandId, type: typeQuality, value: quality });


    });
  };
