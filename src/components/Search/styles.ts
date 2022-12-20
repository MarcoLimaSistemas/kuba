import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
display: flex;
flex-direction: row;
justify-content: center;
padding-top: ${RFValue(20)}px;
`;

export const ContainerInput = styled.TextInput.attrs({
  placeholderTextColor: "#fff"
}) <any>`
width: 75%;
border: 2px solid  ${({ theme }) => theme.COLORS.white_100};
border-radius: 8px;
color: ${({ theme }) => theme.COLORS.white_100};
margin-right: ${RFValue(20)}px;
padding: ${RFValue(16)}px;
`;

export const ButtonSearch = styled.TouchableOpacity`
justify-content: center;
align-items: center;
width: ${RFValue(56)}px;
height: ${RFValue(56)}px;
background-color: ${({ theme }) => theme.COLORS.white_100};
border-radius: 8px;
`;
