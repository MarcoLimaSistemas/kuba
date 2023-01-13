import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
width: 100%;
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-top: ${RFValue(16)}px;
padding: 0 ${RFValue(16)}px;
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