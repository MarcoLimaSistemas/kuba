import { RFValue } from 'react-native-responsive-fontsize';

import styled from 'styled-components/native';

export const Container = styled.View`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
width: 100%;
padding-left: ${RFValue(14)}px;
padding-left: ${RFValue(14)}px;
margin-bottom: 16px;
`;

export const HFlex = styled.View`
direction: row;
align-items: center;
justify-content: space-between;
flex-direction: row;
`

export const TextStatus = styled.Text`
font-size: ${RFValue(14)}px;
text-transform: uppercase;
color: ${({ theme }) => theme.COLORS.gray_100};
/* padding-right: ${RFValue(90)}px; */

`;

export const Percentage = styled.Text`
font-size: ${RFValue(16)}px;
margin-left: ${RFValue(8)}px;
color: ${({ theme }) => theme.COLORS.black};
`;

export const Disconnected = styled.Text`
margin-right: ${RFValue(16)}px;
font-size: ${RFValue(16)}px;
color: ${({ theme }) => theme.COLORS.blue_100};
text-transform: capitalize;
`;
