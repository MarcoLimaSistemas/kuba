import React, {createContext, useContext, ReactNode} from 'react'

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

export const EqualizerProvider = ({children}: {children: ReactNode}) => {
    return (
        <EqualizerContext.Provider value={{}}>
            {children}
        </EqualizerContext.Provider>
    )
}
