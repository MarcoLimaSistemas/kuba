import React from 'react';
import { ITextProps } from './types';
import * as S from './styles';

const Text = ({
	variant,
	color,
	fontSize,
	children,
	style,
	numberOfLines,
}: ITextProps) => {
	return (
		<S.Text
			numberOfLines={numberOfLines}
			variant={variant}
			color={color}
			fontSize={fontSize}
			style={style}>
			{children}
		</S.Text>
	);
};

export default Text;
