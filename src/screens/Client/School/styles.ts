import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
	background-color: ${({ theme }) => theme.COLORS.black};
`;

export const ContainerBody = styled.View``;

export const ContainerButton = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;

export const ContainerVideos = styled.View`
	padding: ${scale(16)}px;
`;
