import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
	flex: 1;
	padding-top: ${scale(16)}px; 
	background-color: ${({ theme }) => theme.COLORS.white_100};
`;

export const Container = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	flex: 1;
	background-color: ${({ theme }) => theme.COLORS.white_100};
`;

export const InputsContainer = styled.View``;

export const TextError = styled.Text`
	color: ${({ theme }) => theme.COLORS.red_900};
	margin-top: ${RFValue(8)}px;
`;

export const BoxButtons = styled.View`
	margin-top: ${RFValue(32)}px;
`;

export const ButtonEyeNewPassword = styled.TouchableOpacity`
	width: ${RFValue(24)}px;
	position: relative;
	z-index: 1;
	left: 90%;
	top: ${RFValue(82)}px;
`;

export const ButtonEyeConfirmationPassword = styled.TouchableOpacity`
	width: ${RFValue(24)}px;
	position: relative;
	z-index: 1;
	left: 90%;
	top: ${RFValue(82)}px;
`;
