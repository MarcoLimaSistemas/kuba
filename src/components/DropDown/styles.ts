import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const DropDownContainer = styled.View``;

export const DropDownTitle = styled.TouchableOpacity<{ isOpen: boolean }>`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	padding: ${scale(12)}px;
	background-color: ${({ theme }) => theme.COLORS.gold_50};
	border-top-left-radius: ${scale(4)}px;
	border-top-right-radius: ${scale(4)}px;
	border-bottom-left-radius: ${({ isOpen }) => scale(isOpen ? 0 : 4)}px;
	border-bottom-right-radius: ${({ isOpen }) => scale(isOpen ? 0 : 4)}px;
`;

export const DropDownContent = styled.View`
	background-color: ${({ theme }) => theme.COLORS.gold_50};
	padding: ${scale(2)}px;
	border-bottom-left-radius: ${scale(4)}px;
	border-bottom-right-radius: ${scale(4)}px;
`;

export const DropDownContentBG = styled.View`
	background-color: #fff;
	padding: ${scale(8)}px;
`;
