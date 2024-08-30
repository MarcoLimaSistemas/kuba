import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex-direction: row;
	justify-content: center;
	padding: 0 ${RFValue(16)}px;
	margin-top: ${RFValue(46)}px;
	margin-bottom: ${RFValue(16)}px;
`;

export const ContainerInput = styled.TextInput`
	flex: 1;
	height: ${RFValue(46)}px;
	border: 2px solid ${({ theme }) => theme.COLORS.white_100};
	border-radius: 8px;
	color: ${({ theme }) => theme.COLORS.white_100};
	margin-right: ${RFValue(8)}px;
	padding: ${RFValue(16)}px;
`;

export const ButtonSearch = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: ${RFValue(46)}px;
	height: ${RFValue(46)}px;
	border-radius: 8px;
`;
