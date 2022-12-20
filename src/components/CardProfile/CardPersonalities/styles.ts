import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
margin-bottom:${RFValue(16)}px; ;
`;

export const ImageCouver = styled.Image`
width: ${RFValue(342)}px;
height: ${RFValue(188)}px;
border-radius: 16px;
`;
export const Name = styled.Text`
position: absolute;
height: 22px;
left: 140px;
top: 83px;

font-size: ${RFValue(18)}px;
text-align: center;
text-transform: uppercase;
color:${({ theme }) => theme.COLORS.white_100};
`;