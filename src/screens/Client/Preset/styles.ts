import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.ScrollView``;

export const ContainerBody = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;

export const ContainerEqualizer = styled.View`
	background: #fff;
	padding-top: ${scale(16)}px;
	border-radius: ${scale(12)}px;
`;

export const ContainerImage = styled.View`
	height: ${scale(200)}px;
	justify-content: flex-end;
`;

export const ImageProfile = styled.Image`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -101;
	height: ${scale(200)}px;
`;
