import {typography} from '../../styles/typography'
import {ITextProps, TTextVariant} from './types'
import styled, {css} from 'styled-components/native'
import {scale} from 'react-native-size-matters'

const getTextStyles = (variant: TTextVariant) => {
    switch (variant) {
        case 'bold':
            return typography['Lato-Bold']
        case 'lightItalic':
            return typography['Lato-LightItalic']
        default:
            return typography['Lato-Regular']
    }
}

export const Text = styled.Text<ITextProps>`
    ${({variant = 'regular', color, fontSize}) => css`
        font-family: ${getTextStyles(variant).fontFamily};
        font-size: ${fontSize ? scale(fontSize) : scale(16)}px;
        color: ${color ?? '#242424'};
    `}
`
