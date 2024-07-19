import {StyleProp, TextStyle} from 'react-native'

export type TTextVariant = 'regular' | 'lightItalic' | 'bold'

export interface ITextProps {
    variant?: TTextVariant
    color?: string
    fontSize?: number
    style?: StyleProp<TextStyle>
    children: React.ReactNode
}
