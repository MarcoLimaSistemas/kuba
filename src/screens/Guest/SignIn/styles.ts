import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f2f2;
  justify-content: space-between;
`;

export const Content = styled(KeyboardAwareScrollView)`
  flex: 1;
`

export const ContainerLogo = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top:  ${RFValue(64)}px;
  margin-bottom:  ${RFValue(64)}px;
`;

export const SignUpButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;


export const ForgotPasswordContainer = styled.View.attrs({
  activeOpacity: 0.6,
})`
  align-items: flex-end;
  margin-bottom: ${RFValue(64)}px;
`;

export const ForgotPasswordButton = styled.TouchableOpacity`  
  color: ${({ theme }) => theme.COLORS.black};
  font-size: ${RFValue(12)}px;
  text-decoration: underline;
`;

export const ForgotPasswordText = styled.Text`
  color: ${({ theme }) => theme.COLORS.black};
  font-size: ${RFValue(12)}px;
  text-decoration: underline;
`

export const ContainerButton = styled.View` 
  padding: 0 16px 16px; 
`;

export const InputsContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 0 16px 16px; 
  width: 100%;
`;

export const Error = styled.Text`
color: ${(props) => props.theme.COLORS.red_900};
font-size: 12px;
padding: 5px;
`;
