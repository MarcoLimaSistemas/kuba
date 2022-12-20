import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
display: flex;
flex: 1;
`;

export const ContainerCarousel = styled.View`

`;
export const BoxImage = styled.View`
`;
export const ImageProfile = styled.Image`
`;
export const NamePreset = styled.Text`
font-size: ${RFValue(16)}px;
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
letter-spacing:${RFValue(8)}px;
text-transform: uppercase;
margin-bottom: ${RFValue(42)}px;
`;

export const Footer = styled.View`
padding:${RFValue(16)}px;
`;

export const EqualizerContainer = styled.View`
  border: 1px solid red;
  width: 100%;
  height: 200px;
`;
