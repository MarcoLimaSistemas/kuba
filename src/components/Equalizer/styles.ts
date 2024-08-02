import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
	margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px;
`;

export const Header = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const ContainerBars = styled.View`
	margin-top: ${scale(16)}px;
	margin-bottom: ${scale(16)}px;
	flex-direction: row;
	justify-content: space-between;
`;

export const ContainerBar = styled.View`
	align-items: center;
`;

export const ContainerSlider = styled.View`
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
`;

export const ContainerDropdown = styled.View`
	z-index: 1001;
`;

export const LineSeparator = styled.View`
	height: ${scale(1)}px;
	background: #f0f0f0;
`;
