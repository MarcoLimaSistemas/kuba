import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
justify-content: center;
align-items: center;
padding: 16px;
`;
export const Image = styled.Image` 

margin-bottom: ${RFValue(56)}px;
`;
export const TextConfirmed = styled.Text`
text-transform: uppercase;
font-weight: 600;
font-size:  ${RFValue(24)}px;
line-height: 29px;
text-align: center;
margin-bottom:${RFValue(52)}px ;
color: ${({ theme }) => theme.COLORS.black};
`;
