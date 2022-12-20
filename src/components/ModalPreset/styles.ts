import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView` 
flex:1;
`;

export const ContainerModal = styled.View` 
height:75%;
margin-top: 60%;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
padding: 16px 16px 32px;
gap: ${RFValue(56)}px;
border-radius: 16px;
background-color:  ${({ theme }) => theme.COLORS.white_100};
`;

export const Header = styled.View`
max-width: 75%;
flex-direction: row;
justify-content: space-between;
margin-bottom: 40px;
`;

export const IconClose = styled.View` 
align-items: flex-end;
`;

export const TitleModal = styled.Text`  
font-size:  ${RFValue(24)}px;
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
margin-top: 5px;
`;
export const ContainerSwitch = styled.View`
align-items: flex-start;
flex-direction: row;
margin-bottom: 5px;
margin-left: 10px;
`;
export const TextSwitch = styled.Text`
font-size: ${RFValue(18)}px;
color: ${({ theme }) => theme.COLORS.black};
padding-top: 11px;
padding-left: 10px;
`;

export const InputContainer = styled.View`
padding-right: 20px;
width: 75%;
justify-content: center;
margin-left: 10px;
`;

export const Input = styled.TextInput`
min-height: ${RFValue(56)}px;
max-height: ${RFValue(56)}px;

background-color: ${({ theme }) => theme.COLORS.white_100};
color: ${({ theme }) => theme.COLORS.black};
font-size: ${RFValue(16)}px;
border: 1px solid ${({ theme }) => theme.COLORS.black};
border-radius: 8px;
padding: ${RFValue(16)}px;

margin-bottom: 10px;
`;

export const TextDelete = styled.Text`
font-size: ${RFValue(18)}px;
color: ${({ theme }) => theme.COLORS.black};
padding-top: 11px;
padding-left: 10px;
text-decoration: underline;
text-align: center;
`;

export const ContainerButtonDelete = styled.View`
justify-content: center;
flex-direction: row;
`;

export const Footer = styled.View`
width: 80%;
margin-bottom: 10px;
`;