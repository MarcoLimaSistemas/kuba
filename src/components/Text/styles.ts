import { typography } from '../../styles/typography';
import { ITextProps, TTextVariant } from './types';
import styled, { css } from 'styled-components/native';
import { scale } from 'react-native-size-matters';

const getTextStyles = (variant: TTextVariant) => {
	switch (variant) {
		case 'thin':
			return typography['Lato-Thin'];
		case 'light':
			return typography['Lato-Light'];
		case 'lightItalic':
			return typography['Lato-LightItalic'];
		case 'regular':
			return typography['Lato-Regular'];
		case 'bold':
			return typography['Lato-Bold'];
		case 'black':
			return typography['Lato-Black'];
		default:
			return typography['Lato-Regular'];
	}
};

export const Text = styled.Text<ITextProps>`
	${({ variant = 'regular', color, fontSize }) => css`
		font-family: ${getTextStyles(variant).fontFamily};
		font-size: ${fontSize ? scale(fontSize) : scale(16)}px;
		color: ${color ?? '#242424'};
	`}
`;
