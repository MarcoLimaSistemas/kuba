import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
display: flex;
flex-direction: row;
width: 100%;
justify-content: space-between;
margin-top: ${RFValue(16)}px;
padding-left: ${RFValue(16)}px;
padding-right: ${RFValue(16)}px;
`;

export const Image = styled.Image` 
`;

export const BoxLogo = styled.Text`
  height: 100%;
  position: absolute;
  left: 20px;
  top: 25px;
`;

export const BoxPerfil = styled.Text`
  height: 100%;
  position: absolute;
  right: 20px;
  top: 9px;
`;