import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { Image } from 'react-native';

export const Container = styled.View``;

export const BoxText = styled.View`
	flex-direction: column;
	margin: 24px;
`;

export const BoxButtons = styled.View`
	flex-direction: column;
	padding: 16px;
`;
export const TextSwitch = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.COLORS.black};
`;

export const ContainerSwitch = styled.View`
	flex-direction: row;
	align-items: center;
	padding: ${RFValue(16)}px;
`;

export const ContainerSocial = styled.View`
	max-width: 80%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: row;
	margin-left: ${RFValue(30)}px;
	margin-bottom: ${RFValue(20)}px;
	margin-top: ${RFValue(20)}px;
`;

export const Description = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.COLORS.black};
	text-align: center;
	padding: ${RFValue(20)}px;
`;
export const ImageProfile = styled.Image`
	width: 192px;
	height: 192px;
	border-radius: 241px;
	margin-left: 25%;
	margin-bottom: 10px;
`;

export const LogoSocial = styled(Image)``;

export const Name = styled.Text`
	text-align: center;
	font-size: ${RFValue(24)}px;
	color: ${({ theme }) => theme.COLORS.black};
`;
export const Separator = styled.View`
	margin-bottom: 10px;
`;
export const Text = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.COLORS.black};
`;

export const TextBold = styled.Text`
	font-size: ${RFValue(18)}px;
	color: ${({ theme }) => theme.COLORS.black};
`;
