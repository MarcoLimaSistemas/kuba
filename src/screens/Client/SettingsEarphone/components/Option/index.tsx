import React from 'react';
import { useState } from 'react';
import DropDownPicker, { ValueType } from 'react-native-dropdown-picker';
import { scale } from 'react-native-size-matters';
import Text from '@components/Text';
import { typography } from '../../../../../styles/typography';
import * as S from './styles';

interface IOptionProps {
	option: string;
	zIndex: number;
}

export const Option = ({ option, zIndex }: IOptionProps) => {
	const [openDropdown, setOpenDropdown] = useState(false);
	const [items] = useState([
		{
			label: 'Voltar uma música',
			value: 0,
		},
		{
			label: 'Diminuir volume',
			value: 1,
		},
		{
			label: 'Aumentar volume',
			value: 2,
		},
		{
			label: 'Passar uma música',
			value: 3,
		},
	]);
	const [value, setValue] = useState<ValueType | null>(items[0].value);

	return (
		<S.Container>
			<Text variant="bold" fontSize={14}>{option}</Text>

			<S.ContainerDropdown>
				<DropDownPicker
					open={openDropdown}
					value={value}
					items={items}
					setOpen={setOpenDropdown}
					setValue={setValue}
					containerStyle={{
						width: '100%',
						zIndex: zIndex,
					}}
					selectedItemContainerStyle={{
						backgroundColor: '#e4e1e1',
					}}
					showTickIcon={false}
					textStyle={{
						color: '#656565',
						fontFamily: typography['Lato-Bold'].fontFamily,
						fontSize: scale(14),
					}}
					listItemLabelStyle={{
						fontFamily: typography['Lato-Regular'].fontFamily,
						color: '#656565',
					}}
					labelProps={{
						numberOfLines: 1,
					}}
					style={{
						borderColor: 'transparent',
						paddingLeft: 0,
						paddingRight: 0,
						backgroundColor: 'transparent',
					}}
					dropDownContainerStyle={{
						borderColor: 'transparent',
						width: '100%',
						elevation: 4,
						borderRadius: 0,
					}}
					flatListProps={{
						ItemSeparatorComponent: () => <S.LineSeparator />,
					}}
				/>
			</S.ContainerDropdown>
		</S.Container>
	);
};
