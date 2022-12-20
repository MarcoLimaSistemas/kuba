import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.black};
`;

export const Title = styled.Text`
font-size: ${RFValue(16)}px;
text-align: center;
text-transform: uppercase;
color:${({ theme }) => theme.COLORS.white_100};
letter-spacing: ${RFValue(8)}px;
`;

export const ContainerPersonalities = styled.View`
display: flex;
flex-direction: column;
padding: 16px;
`;