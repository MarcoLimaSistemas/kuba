import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  activeButtonGoBack?: boolean;
}

export const ContainerLogo = styled.View<Props> `
  width: ${({ activeButtonGoBack }) => activeButtonGoBack ? '80%' : '100%'};
  justify-content: center;
`;

export const Title = styled.Text`
  text-align: left;
  color: ${({ theme }) => theme.COLORS.black};
  font-size: ${RFValue(24)}px;
`
export const ContainerIHeaderShadow = styled.View`
  width: 100%;
  overflow: hidden;
  align-items: center;
  margin-bottom: ${RFValue(8)}px;
  margin-top: ${RFValue(32)}px;
`;

export const ContainerShadow = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;   
`;

export const ButtonBack = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${RFValue(16)}px;
`;
