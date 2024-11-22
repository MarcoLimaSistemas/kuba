import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
flex: 1;
padding-top: ${scale(16)}px;
`;

export const Container = styled.ScrollView`
	background: #f4f2f2;
`;
export const ContainerEqualizer = styled.View`
	margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px; 
	background-color:${({theme})=> theme.COLORS.white_100} ;
	padding:  ${scale(16)}px;
	border-top-left-radius: ${scale(16)}px;
	border-top-right-radius: ${scale(16)}px;

	
`;

export const ContainerImg = styled.View`
	height: ${scale(200)}px;
	justify-content: center;
	align-items: center;
`;

export const ContainerCarousel = styled.View`
	background: #fff;
	margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px; 
	padding: ${scale(8)}px;
	border-bottom-left-radius:${scale(16)}px;
	border-bottom-right-radius:${scale(16)}px;
	margin-bottom: 8px;


`;

export const BoxButtons = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

export const Footer = styled.View`
	padding: ${scale(16)}px;
`;

export const ContainerConnections = styled.View`
	background: #fff;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: ${scale(8)}px;
	border-radius: 8px;
	margin-left: ${scale(16)}px;
	margin-right: ${scale(16)}px;
	margin-bottom: 16px;
`;
