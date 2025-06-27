import {NativeModules} from 'react-native';

const {AudioEqualizerModule} = NativeModules;

export default {
    getCurrentEqualizerValues: async () => {
        try {
            const result =
                await AudioEqualizerModule.getCurrentEqualizerValues();
            console.log(result);
        } catch (e) {
            console.error(e);
        }
    },
};
