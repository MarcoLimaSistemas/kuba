import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: ${scale(16)}px;
`;

export const Device = styled.TouchableOpacity``;
