import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const ButtonViewGallery = styled.TouchableOpacity`
	justify-content: center;
	align-items: center;
	width: ${scale(104)}px;
	height: ${scale(40)}px;
`;
