import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
flex: 1;
padding-top: ${scale(24)}px;
`;

export const Container = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;

