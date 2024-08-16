import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const ButtonTutorials = styled.TouchableOpacity`
	flex: 1;
`;

export const IconButtonTutorials = styled.View`
	align-items: center;
	justify-content: center;

	background-color: ${({ theme }) => theme.COLORS.gold_100};
	border-radius: ${scale(8)}px;
	padding: ${scale(16)}px;
`;
