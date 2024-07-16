import React from 'react'
import {View} from 'react-native'

export const Spacer = ({w, h}: {w?: number; h?: number}) => {
    return (
        <View
            style={{
                width: w ?? 0,
                height: h ?? 0
            }}
        />
    )
}
