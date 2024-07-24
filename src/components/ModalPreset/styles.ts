import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { typography } from '../../styles/typography';

export const Container = styled.View`
	position: relative;
	top: 0;
	left: 0;
	flex: 1;
	background: rgba(0, 0, 0, 0.5);
	justify-content: flex-end;
`;

export const ContainerModal = styled.View`
	background-color: ${({ theme }) => theme.COLORS.white_100};
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	border-top-right-radius: ${scale(16)}px;
	border-top-left-radius: ${scale(16)}px;
`;

export const Header = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const IconClose = styled.View``;

export const TitleModal = styled.Text`
	font-size: ${RFValue(24)}px;
	text-align: center;
	color: ${({ theme }) => theme.COLORS.black};
	margin-top: 5px;
`;
export const ContainerSwitch = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const InputContainer = styled.View``;

export const Input = styled.TextInput`
	height: ${scale(48)}px;
	font-family: ${typography['Lato-Regular'].fontFamily};
	color: ${({ theme }) => theme.COLORS.black};
	font-size: ${RFValue(16)}px;
	border: 2px solid ${({ theme }) => theme.COLORS.black};
	border-radius: 8px;
	padding: ${RFValue(16)}px;
`;

export const TextDelete = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.COLORS.black};
	padding-top: 11px;
	padding-left: 10px;
	text-decoration: underline;
	text-align: center;
`;

export const ContainerButtonDelete = styled.View`
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

export const Footer = styled.View``;
