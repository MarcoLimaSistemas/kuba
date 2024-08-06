import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const LineSeparator = styled.View`
	height: ${scale(1)}px;
	background: #f0f0f0;
`;

export const ContainerDropdown = styled.View`
	width: 45%;
`;
