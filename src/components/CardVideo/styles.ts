import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
display: flex;
width: ${RFValue(340)}px;
height: ${RFValue(249)}px;
align-items: center;
justify-content: center;
background-color: ${({ theme }) => theme.COLORS.gray_100};
padding: 16px;
border-radius: 16px;
margin-bottom:${RFValue(24)}px; 
`;
export const Thumbnail = styled.Image`
width: 104%;
height: 87%;
border-radius: 16px;
margin-bottom: ${RFValue(20)}px;
padding: 8px;
`;

export const Title = styled.Text`
font-size: ${RFValue(16)}px;
text-align: center;
color:${({ theme }) => theme.COLORS.white_100};
`;