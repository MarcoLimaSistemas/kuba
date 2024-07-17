import {NativeModules} from 'react-native'

const {EqualizerModule} = NativeModules

export default {
    initEqualizer: async () => {
        try {
            const result = await EqualizerModule.initEqualizer()
            console.log(result)
        } catch (e) {
            console.error(e)
        }
    },

    setBandLevel: async (band: any, level: any) => {
        try {
            const result = await EqualizerModule.setBandLevel(band, level)
            console.log(result)
        } catch (e) {
            console.error(e)
        }
    },

    getNumberOfBands: async () => {
        try {
            const result = await EqualizerModule.getNumberOfBands()
            return result
        } catch (e) {
            console.error(e)
        }
    },

    getBandLevelRange: async () => {
        try {
            const result = await EqualizerModule.getBandLevelRange()
            return result
        } catch (e) {
            console.error(e)
        }
    },

    getBandFreq: async (band: any) => {
        try {
            const result = await EqualizerModule.getBandFreq(band)
            return result
        } catch (e) {
            console.error(e)
        }
    }
}
