import { RFValue } from 'react-native-responsive-fontsize';
import styled from "styled-components/native";

export const DropDownContainer = styled.View`
  margin-bottom: ${RFValue(16)}px;
`

export const DropDownTitle = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${RFValue(12)}px;
  background-color: ${({ theme }) => theme.COLORS.gold_50};
  border-top-left-radius: ${RFValue(8)}px;
  border-top-right-radius: ${RFValue(8)}px;
`

export const TextDropDown = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.COLORS.black};
`
export const DropDownContent = styled.Text`
  background-color: ${({ theme }) => theme.COLORS.gold_50};
  padding: ${RFValue(8)}px;
  border-bottom-left-radius: ${RFValue(8)}px;
  border-bottom-right-radius: ${RFValue(8)}px;

  font-size: ${RFValue(16)}px;
`