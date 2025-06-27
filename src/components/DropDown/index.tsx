import * as React from 'react';

import { Image } from 'react-native';
import {
	DropDownContainer,
	DropDownContent,
	DropDownContentBG,
	DropDownTitle,
} from './styles';

import { ArrowDown } from '@assets/icons';
import { useState } from 'react';
import Text from '@components/Text';

interface DropdownProps {
	title: string;
	text: string;
}

export function Dropdown({ title, text }: DropdownProps) {
	const [open, setOpen] = useState(false);

	return (
		<DropDownContainer>
			<DropDownTitle onPress={() => setOpen(!open)} isOpen={open}>
				<Text variant="bold">{title}</Text>
				<Image source={ArrowDown} />
			</DropDownTitle>

			{open ? (
				<DropDownContent>
					<DropDownContentBG>
						<Text fontSize={14} color="#696969">
							{text}
						</Text>
					</DropDownContentBG>
				</DropDownContent>
			) : (
				''
			)}
		</DropDownContainer>
	);
}
