import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const MessageText = styled.Text`
  color: ${({ theme }) => theme.COLORS.red_900};
  font-size: 14px;
  padding: 24px;
  text-align: center;
`

export const ContainerCarousel = styled.View`
  width: 100%;
`;


export const TitleCarousel = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.COLORS.gray_100};
  padding-left: 16px;
  margin: ${RFValue(8)}px;
  margin-bottom: ${RFValue(16)}px;
`;

