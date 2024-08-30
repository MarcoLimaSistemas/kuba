import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';


export const Wrapper = styled.View`
flex: 1;
padding-top: ${scale(16)}px;
background-color: ${({ theme }) => theme.COLORS.white_100};
`;

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.white_100};
`;