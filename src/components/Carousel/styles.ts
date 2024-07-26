import styled from 'styled-components/native';

import { scale } from 'react-native-size-matters';

export const Container = styled.View`
	padding: 0 ${scale(16)}px;
`;

export const ButtonAdd = styled.TouchableOpacity`
	background: #fff;
	width: ${scale(152)}px;
	justify-content: center;
	align-items: center;
	border-radius: ${scale(8)}px;
	height: ${scale(180)}px;
`;
