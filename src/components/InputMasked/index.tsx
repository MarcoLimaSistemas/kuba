import React, { ReactNode } from 'react';
import { Image } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInputMaskProps } from 'react-native-masked-text';
import {
	InputMask,
	InputArea,
	InputGroup,
	InputLabel,
	TouchableIcon,
} from './styles';

import { Eye, EyeOff } from '@assets/icons';
import theme from '../../styles/theme';
import { Spacer } from '@components/Spacer';
import Text from '@components/Text';

interface InputMaskedProps extends TextInputMaskProps {
	control: any;
	label: string;
	name: string;
	eye?: boolean;
	showPassword?: boolean;
	setShowPassword?: React.Dispatch<React.SetStateAction<boolean>> | any;
	error?: ReactNode;
}

export function InputMasked({
	control,
	label,
	name,
	eye,
	error,
	showPassword,
	setShowPassword,
	...props
}: InputMaskedProps) {
	return (
		<InputGroup>
			<Text variant="bold" fontSize={14}>
				{label}
			</Text>
			<Spacer h={8} />
			<Controller
				control={control}
				name={name}
				rules={{
					required: true,
				}}
				render={({ field: { onChange, onBlur, value } }) => (
					<InputArea>
						<InputMask
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder="Digite seu nome"
							placeholderTextColor={'#A0A0A0'}
							{...props}
						/>
						{eye && (
							<TouchableIcon
								onPress={() => setShowPassword(!showPassword)}>
								{showPassword ? (
									<Image source={EyeOff} />
								) : (
									<Image source={Eye} />
								)}
							</TouchableIcon>
						)}
					</InputArea>
				)}
			/>
			{error}
		</InputGroup>
	);
}
