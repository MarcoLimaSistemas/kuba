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

export const IconClose = styled.View` 
align-items: flex-end;
`;

export const IconTrash = styled.View` 
align-items: center;
margin-top: ${RFValue(40)}px;
margin-bottom: ${RFValue(60)}px;
`;

export const TitleModal = styled.Text`  
font-size:  ${RFValue(24)}px;
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
margin-top: 63px;
`;




