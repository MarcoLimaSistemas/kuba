import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
flex: 1;
`;

export const ImageDevice = styled.Image`
margin-left: 40%;
`;

export const Range = styled.View`
margin-top: 100px;
margin-bottom:150px;
border: 1px solid red;
transform: rotate(90deg);
`;

export const NameDevice = styled.Text`
font-size: ${RFValue(16)}px;
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
letter-spacing:${RFValue(8)}px;
text-transform: uppercase;
margin-bottom: ${RFValue(42)}px;
`;

export const ContainerCarousel = styled.View`
`;

export const BoxButtons = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
margin-left: ${RFValue(16)}px;
margin-right: ${RFValue(16)}px;
`;

export const Footer = styled.View`
padding:${RFValue(16)}px;
`;

