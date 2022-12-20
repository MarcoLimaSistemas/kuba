import { TextInput } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const InputControlContainer = styled.View`
  flex: 1;
  margin-top: ${RFValue(16)}px;
`
export const Label = styled.Text`
font-style: normal;
font-weight: 600;
font-size: ${RFValue(18)}px;
color: ${({ theme }) => theme.COLORS.black};
margin-bottom: ${RFValue(8)}px;
`

export const InputMasked = styled(TextInputMask)`
  flex: 1;
  padding-left: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.COLORS.white_100};
  border: 1px solid ${({ theme }) => theme.COLORS.black};
  border-radius: ${RFValue(8)}px;
`

export const InputUnMasked = styled(TextInput)`
  flex: 1;
  padding-left: ${RFValue(16)}px;
  background-color: ${({ theme }) => theme.COLORS.white_100};
  border: 1px solid ${({ theme }) => theme.COLORS.black};
  border-radius: ${RFValue(8)}px;
`

export const TextSizes = styled.Text`
  text-align: right;
  margin-top: ${RFValue(4)}px;
`