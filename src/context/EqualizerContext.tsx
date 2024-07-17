import React, {createContext, useContext, ReactNode} from 'react'
import {NativeModules} from 'react-native'

const {} = NativeModules

type EqualizerContextType = {}

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

type EqualizerProviderProps = {
    children: ReactNode
}

export const EqualizerProvider = ({children}: EqualizerProviderProps) => {
    const value = {}

    return (
        <EqualizerContext.Provider value={value}>
            {children}
        </EqualizerContext.Provider>
    )
}
