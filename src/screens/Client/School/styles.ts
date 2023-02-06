import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
flex: 1;
justify-content: space-between;
background-color: ${({ theme }) => theme.COLORS.black};
`;

export const ContainerButton = styled.View`
  padding: ${RFValue(16)}px;
`

export const ContainerVideos = styled.View`
display: flex;
flex-direction: column;
padding: 16px;
`;

export const MessageText = styled.Text`
  color: ${({ theme }) => theme.COLORS.white_100};
  font-size: 14px;
  padding: 24px;
  text-align: center;
  margin-bottom: 100%;
`