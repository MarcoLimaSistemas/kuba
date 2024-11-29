import { MotiScrollView } from 'moti';
import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
	width: 100%;
	padding-top: ${scale(24)}px; 
	background-color: ${({ theme }) => theme.COLORS.black};
`;

export const Container = styled(MotiScrollView)`
	background-color: ${({ theme }) => theme.COLORS.black};
`;

export const ContainerFilter = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	padding-left: ${scale(24)}px;
`;
export const ContainerBody = styled.View``;

export const ContainerButton = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;

export const ContainerVideos = styled.View`
	padding: ${scale(16)}px;
`;
export const TextNotVideos = styled.Text`
font-size: ${RFValue(14)}px;
text-align: justify;
padding-left:  ${scale(24)}px;
color: ${({ theme }) => theme.COLORS.white_100};
`;
