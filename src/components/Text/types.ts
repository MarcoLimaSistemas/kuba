import { StyleProp, TextStyle } from 'react-native';

export type TTextVariant =
	| 'thin'
	| 'light'
	| 'lightItalic'
	| 'regular'
	| 'bold'
	| 'black';

export interface ITextProps {
	variant?: TTextVariant;
	color?: string;
	fontSize?: number;
	numberOfLines?: number;
	style?: StyleProp<TextStyle>;
	children: React.ReactNode;
}
