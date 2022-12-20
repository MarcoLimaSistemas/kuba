import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(KeyboardAwareScrollView)`
background-color: ${({ theme }) => theme.COLORS.white_100};
`

export const BoxPhoto = styled.View`
padding-left: ${RFValue(16)}px;
padding-right: ${RFValue(16)}px;
flex-direction: row;
align-items: center;
`

export const Photo = styled.Image`
display: flex;
width: ${RFValue(72)}px;
height: ${RFValue(72)}px;
border-radius: ${RFValue(72)}px;
`

export const BoxButtons = styled.View`
margin-top: ${RFValue(32)}px;
`

export const TextPhoto = styled.Text`
margin-left: ${RFValue(16)}px;
text-decoration: underline;
color: ${({ theme }) => theme.COLORS.black};
`

export const InputsContainer = styled.View` 
flex-direction: column;
justify-content: center;
padding: 0 16px 16px; 
margin-top: ${RFValue(16)}px;
width: 100%;
`;

export const TextError = styled.Text`
  color: ${({ theme }) => theme.COLORS.red_900};
  margin-top: ${RFValue(8)}px;
`