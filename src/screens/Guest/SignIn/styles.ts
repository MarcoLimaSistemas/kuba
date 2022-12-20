import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
flex:1;
width: 100%;
height: 100%;
background-color: #f2f2f2;
margin-top: 33px;
`;

export const ContainerLogo = styled.View`
display: flex;
align-items: center;
justify-content: center;
margin-top:  ${RFValue(64)}px;
margin-bottom: ${RFValue(138)}px;
`;

export const Logo = styled.Image``;

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
height: 30px;
position:absolute;
top:35px;
left:90%;
`;

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
