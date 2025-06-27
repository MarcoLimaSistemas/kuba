import React from 'react';
import { ActivityIndicator, TouchableOpacityProps } from 'react-native';
import { ButtonVariant, StyledButton } from './styles';
import Text from '@components/Text';

interface Props extends TouchableOpacityProps {
	title: string;
	disabled?: boolean;
	variant?: ButtonVariant;
	activeLoad?: boolean;
}

const text = {
	primary: '#D4BD85',
	secondary: '#242424',
	outline: '#000',
};

export function Button({
	disabled,
	title,
	activeLoad,
	variant = 'primary',
	...rest
}: Props) {
	return (
		<StyledButton disabled={disabled} variant={variant} {...rest}>
			{activeLoad ? (
				<ActivityIndicator color="#f2f2f2" size={20} />
			) : (
				<>
					<Text
						variant="bold"
						color={text[variant]}
						style={{ textTransform: 'uppercase' }}
						fontSize={14}>
						{title}
					</Text>
				</>
			)}
		</StyledButton>
	);
}
