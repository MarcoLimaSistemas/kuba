import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #f2f2f2;
`;

export const Content = styled(KeyboardAwareScrollView)`
  flex: 1;
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

export const SignUpButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})``;

export const TouchableIcon = styled(SignUpButton)`
  justify-content:center;
  align-items: flex-end;
  width:35px;

  position: relative;
  left:85%;
  bottom:40%;
`;
