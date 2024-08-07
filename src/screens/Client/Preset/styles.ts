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

export const BoxImage = styled.View``;
export const ImageProfile = styled.Image``;
