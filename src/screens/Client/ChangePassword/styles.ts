import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled(KeyboardAwareScrollView)`
background-color: ${({ theme }) => theme.COLORS.white_100};
`

export const InputsContainer = styled.View` 
flex-direction: column;
justify-content: center;
padding: 0 16px 16px; 
width: 100%;
`;

export const TextError = styled.Text`
color: ${({ theme }) => theme.COLORS.red_900};
margin-top: ${RFValue(8)}px;
`

export const BoxButtons = styled.View`
margin-top: ${RFValue(32)}px;
padding-left:${RFValue(8)}px;
padding-right:${RFValue(8)}px;
`

export const ButtonEyeNewPassword = styled.TouchableOpacity`
width: ${RFValue(24)}px;
position: relative;
z-index: 1;
left: 90%;
top: ${RFValue(82)}px;
`

export const ButtonEyeConfirmationPassword = styled.TouchableOpacity`
width: ${RFValue(24)}px;
position: relative;
z-index: 1;
left: 90%;
top: ${RFValue(82)}px;
`