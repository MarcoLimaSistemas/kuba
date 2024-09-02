import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
flex: 1;
background-color: ${({ theme }) => theme.COLORS.white_100};
align-items: center;
justify-content: center;
padding: ${RFValue(16)}px;
`;

export const TextSuccess = styled.Text`
font-weight: 600;
font-size: 24px;
line-height: 29px;
text-align: center;
font-family: 'Lato-Regular';
color: ${({ theme }) => theme.COLORS.black};
text-transform: uppercase;
margin-top: ${RFValue(36)}px;
margin-bottom: ${RFValue(22)}px;
`
;
