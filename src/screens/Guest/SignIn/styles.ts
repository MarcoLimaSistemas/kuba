import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f2f2;
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


export const ForgotPasswordButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  align-items: flex-end;
  margin-top: 8px;
  margin-bottom: 71px;
`;

export const ForgotPassword = styled.Text`  
  color: ${({ theme }) => theme.COLORS.black};
  font-size: ${RFValue(12)}px;
  text-decoration: underline;
`;

export const ContainerButton = styled.View` 
  padding: 0 16px 16px; 
`;

export const InputsContainer = styled.View`
  flex-direction: column;
  justify-content: center;
  padding: 0 16px 16px; 
  width: 100%;
`;

export const InputGroup = styled.View`
  margin-bottom: ${RFValue(16)}px;
`

export const InputArea = styled.View`
  flex-direction: row;
  width: 100%;
  border-radius: ${RFValue(8)}px;
  align-items: center;
  height: ${RFValue(50)}px;
  border: 1px solid ${({ theme }) => theme.COLORS.black};
  border-radius: ${RFValue(8)}px;
`

export const InputLabel = styled.Text`
  font-weight: 600;
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.COLORS.black};
  margin-bottom: ${RFValue(8)}px;
`

export const InputMasked = styled(TextInputMask)`
  padding-left: ${RFValue(16)}px;
  flex: 1;
`

export const Input = styled.TextInput`
  padding-left: ${RFValue(16)}px;
  flex: 1;
`

export const TouchableIcon = styled(SignUpButton)`
  height: 100%;
  width: 48px;
  align-items: center;
  justify-content: center;
`;

export const Error = styled.Text`
color: ${(props) => props.theme.COLORS.red_900};
font-size: 12px;
padding: 5px;
`;
