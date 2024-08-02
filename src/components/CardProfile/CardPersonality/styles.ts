import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity``;
export const ContainerText = styled.View``;

export const ImageCover = styled.Image`
	width: 100%;
	height: ${scale(192)}px;
	border-radius: ${scale(16)}px;
`;
