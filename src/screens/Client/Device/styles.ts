import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
	flex: 1;
	background: #f4f2f2;
`;

export const ImageDevice = styled.Image`
	margin-left: auto;
	margin-right: auto;
`;

export const ContainerCarousel = styled.View`
	background: #fff;
	margin-left: ${scale(16)}px;
	margin-right: ${scale(16)}px;
	padding: ${scale(8)}px;
	border-radius: 8px;
`;

export const BoxButtons = styled.View`
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
`;

export const Footer = styled.View`
	padding: ${scale(16)}px;
	margin-top: ${scale(32)}px;
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
