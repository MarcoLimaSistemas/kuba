import React, { ReactNode } from 'react';

import { ButtonTutorials, IconButtonTutorials } from './styles';
import Text from '@components/Text';
import { Spacer } from '@components/Spacer';

interface ButtonSquareProps {
	children: ReactNode;
	label: string;
	onPress: () => void;
}

export function ButtonSquare({ children, label, ...rest }: ButtonSquareProps) {
	return (
		<ButtonTutorials {...rest}>
			<IconButtonTutorials>{children}</IconButtonTutorials>
			<Spacer h={8} />
			<Text
				fontSize={12}
				variant="bold"
				style={{
					textAlign: 'center'
				}}>
				{label}
			</Text>
		</ButtonTutorials>
	);
}
