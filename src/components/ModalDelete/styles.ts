import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
	position: relative;
	top: 0;
	left: 0;
	flex: 1;
	background: rgba(0, 0, 0, 0.5);
	justify-content: flex-end;
`;

export const ContainerModal = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	background-color: ${({ theme }) => theme.COLORS.white_100};
	border-top-right-radius: ${scale(16)}px;
	border-top-left-radius: ${scale(16)}px;
`;

export const IconClose = styled.View`
	align-items: flex-end;
`;

export const IconTrash = styled.View`
	align-items: center;
	margin-top: ${RFValue(40)}px;
	margin-bottom: ${RFValue(60)}px;
`;

export const TitleModal = styled.Text`
	font-size: ${RFValue(24)}px;
	text-align: center;
	color: ${({ theme }) => theme.COLORS.black};
	margin-top: 63px;
`;
