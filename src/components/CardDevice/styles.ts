import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
	border-radius: ${scale(8)}px;
	background: #fff;
	height: ${scale(180)}px;
`;

export const ContainerImage = styled.View`
	width: ${scale(152)}px;
	height: ${scale(152)}px;
	justify-content: center;
	align-items: center;
`;
export const Box = styled.View`
	justify-content: center;
	align-items: center;
`;
