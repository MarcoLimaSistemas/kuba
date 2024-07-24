import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;

export const ContainerWithAvatar = styled.View`
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
`;

export const ContainerWithoutAvatar = styled.View`
	flex-direction: row;
	align-items: center;
`;

export const Avatar = styled.Image`
	width: ${scale(40)}px;
	height: ${scale(40)}px;
	border-radius: ${scale(56)}px;
`;
