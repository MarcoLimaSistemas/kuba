import React, {
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useState
} from 'react'

import Equalizer from '../utils/equalizerModule'

type EqualizerContextType = {
    numBands: number
    bandLevelRange: [number, number]
    bandFrequencies: number[]
    setBandLevel: (band: number, level: number) => void
}

const EqualizerContext = createContext<EqualizerContextType | undefined>(
    undefined
)

export const useEqualizer = (): EqualizerContextType => {
    const context = useContext(EqualizerContext)
    if (!context) {
        throw new Error('useEqualizer must be used within an EqualizerProvider')
    }
    return context
}

export const EqualizerProvider = ({children}: {children: ReactNode}) => {
    const [numBands, setNumBands] = useState(0)
    const [bandLevelRange, setBandLevelRange] = useState<[number, number]>([
        0, 0
    ])
    const [bandFrequencies, setBandFrequencies] = useState<number[]>([])

    useEffect(() => {
        async function fetchData() {
            await Equalizer.initEqualizer()
            const bands = await Equalizer.getNumberOfBands()
            setNumBands(bands)
            const range = await Equalizer.getBandLevelRange()
            setBandLevelRange(range)

            const frequencies = []
            for (let i = 0; i < bands; i++) {
                const freq = await Equalizer.getBandFreq(i)
                frequencies.push(freq)
            }
            setBandFrequencies(frequencies)
        }
        fetchData()
    }, [])

    const setBandLevel = async (band: number, level: number) => {
        await Equalizer.setBandLevel(band, level)
    }

    return (
        <EqualizerContext.Provider
            value={{numBands, bandLevelRange, bandFrequencies, setBandLevel}}>
            {children}
        </EqualizerContext.Provider>
    )
}
