import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f2f2;
`;

export const ContainerButtons = styled.View`
  margin-top: ${RFValue(24)}px; 
`;

export const ScrollAwareView = styled(KeyboardAwareScrollView)`
  flex: 1;
  padding: ${RFValue(16)}px; 
`;

export const TextError = styled.Text`
color: ${(props) => props.theme.COLORS.red_900};
font-size: 12px;
padding: 5px;
`;

export const Title = styled.Text`
color: ${(props) => props.theme.COLORS.gray_100};
font-size: ${RFValue(14)}px;
font-weight: 400;
margin-bottom: ${RFValue(16)}px;
`;
