import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	width: ${scale(104)}px;
	height: ${scale(40)}px;
	border-radius: ${scale(4)}px;
`;

export const ContainerText = styled.View`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
`;

export const ImageBackground = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: ${scale(4)}px;
`;
export const Background = styled.View`
	width: 100%;
	height: 100%;
	border-radius: ${scale(4)}px;
	background-color: ${({theme})=> theme.COLORS.black};
`;
