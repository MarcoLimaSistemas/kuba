import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	background-color: rgba(255, 255, 255, 0.1);
	padding: ${scale(8)}px;
	border-radius: ${scale(16)}px;
`;
export const Thumbnail = styled.Image`
	height: ${scale(170)}px;
	border-radius: ${scale(8)}px;
	width: 100%;
`;
