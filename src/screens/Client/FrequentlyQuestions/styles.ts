import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RFValue } from 'react-native-responsive-fontsize';

import styled from "styled-components/native";

export const Container = styled(KeyboardAwareScrollView)`
  background-color: white;
`
export const TitleHeader = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: 600;
  font-size: ${RFValue(24)}px;
  color: black;
`

export const Content = styled.View`
  padding: ${RFValue(16)}px;
`
