import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;


export const ContainerSlider = styled.View`
	align-items: flex-start;
	margin-top: ${scale(16)}px;
	
`;

export const ContainerDropdown = styled.View`
	z-index: 1001;
`;

export const LineSeparator = styled.View`
	height: ${scale(1)}px;
	background: #f0f0f0;
`;
