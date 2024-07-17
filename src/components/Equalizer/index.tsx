import React, {useState} from 'react'
import Text from '@components/Text'

import {frequencies as frequenciesList} from './data'
import {Spacer} from '@components/Spacer'
import {View} from 'react-native'
import {Icons} from '@assets/icons'
import {scale} from 'react-native-size-matters'
import VerticalSlider from '@components/Slider'

import * as S from './styles'
import {useEqualizer} from '../../context/EqualizerContext'

interface EqualizerProps {
    handleScrollEnabled: (enabled: boolean) => void
}

export const Equalizer = ({handleScrollEnabled}: EqualizerProps) => {
    const {isInitialized, bands, currentValues, setBandLevel} = useEqualizer()

    const handleSliderChange = (band: number, level: number) => {
        setBandLevel(band, level)
    }

    const [frequencies, setFrequencies] = useState(frequenciesList)

    const handleValueChange = (index: number, value: number) => {
        const updatedFrequencies = [...frequencies]
        updatedFrequencies[index].decibelQuantity = value
        setFrequencies(updatedFrequencies)
        adjustAudio(index, value)
    }

    const adjustAudio = (index: number, value: number) => {
        // Aqui você pode implementar a lógica para ajustar o áudio com base no valor do decibelQuantity
        console.log(
            `Ajustando frequência ${frequencies[index].frequency} para ${value} dB`
        )
        // Exemplo simples: console.log ou enviar para uma API de ajuste de áudio local
    }

    if (!isInitialized) {
        return (
            <View>
                <Text>Carregando Equalizador...</Text>
            </View>
        )
    }

    return (
        <S.Container>
            <S.Header>
                <Text variant="bold">Equalizador</Text>

                <View
                    style={{
                        flexDirection: 'row'
                    }}>
                    <Icons.Plus width={scale(32)} height={scale(32)} />
                    <Spacer w={16} />
                    <Icons.Pencil width={scale(32)} height={scale(32)} />
                </View>
            </S.Header>

            <S.ContainerBars>
                {frequencies.map((bar, index) => (
                    <S.ContainerBar
                        key={bar.frequency}
                        style={{width: 32}}
                        onTouchStart={() => handleScrollEnabled(false)}
                        onTouchEnd={() => handleScrollEnabled(true)}
                        onTouchCancel={() => handleScrollEnabled(true)}>
                        <VerticalSlider
                            min={-10}
                            max={10}
                            step={1}
                            value={bar.decibelQuantity}
                            onValueChange={value =>
                                handleValueChange(index, value)
                            }
                        />

                        <Spacer h={16} />
                        <Text fontSize={12}>{bar.frequency}</Text>
                    </S.ContainerBar>
                ))}
            </S.ContainerBars>
        </S.Container>
    )
}
