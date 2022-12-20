import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
height: ${RFValue(80)}px;
margin-bottom: ${RFValue(10)}px;
`;

export const Title = styled.Text`
font-size: ${RFValue(14)}px;
text-align: center;
text-align: justify;
color:${({ theme }) => theme.COLORS.gray_200};
padding-left: 20px;
margin-bottom: ${RFValue(10)}px;
`
