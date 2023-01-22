import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

export const Container = styled(SafeAreaView)`
flex: 1;
`;

export const ImageDevice = styled.Image`
margin-left: 40%;
`;

export const Range = styled.View`
margin-top: ${RFValue(100)}px;
margin-bottom: ${RFValue(150)}px;
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
padding: ${RFValue(16)}px;
margin-top: ${RFValue(32)}px;
`;

export const ContainerConnections = styled.View`
display: flex;
align-items: center;
justify-content: space-between;
flex-direction: row;
width: 100%;
padding-left: ${RFValue(14)}px;
padding-left: ${RFValue(14)}px;
margin-bottom: 16px;
`;

export const HFlex = styled.View`
direction: row;
align-items: center;
justify-content: space-between;
flex-direction: row;
`

export const TextStatus = styled.Text`
font-size: ${RFValue(14)}px;
text-transform: uppercase;
color: ${({ theme }) => theme.COLORS.gray_100};
/* padding-right: ${RFValue(90)}px; */

`;

export const Percentage = styled.Text`
font-size: ${RFValue(16)}px;
margin-left: ${RFValue(8)}px;
color: ${({ theme }) => theme.COLORS.black};
`;

export const Disconnected = styled.Text`
margin-right: ${RFValue(16)}px;
font-size: ${RFValue(16)}px;
color: ${({ theme }) => theme.COLORS.blue_100};
text-transform: capitalize;
`;

export const ContainerModal = styled.View`  
  display: flex;
  align-self: flex-end;
  flex-direction: column;
  justify-content: flex-end;

  width: 100%;
  height: 75%;
  bottom: -25%;

  padding: ${RFValue(16)}px ${RFValue(16)}px;

  border-top-left-radius:  ${RFValue(16)}px;
  border-top-right-radius:  ${RFValue(16)}px;

  background:  ${({ theme }) => theme.COLORS.white_100};
`;

export const HeaderModal = styled.View`
  flex-direction: row;
`

export const TitleModal = styled.Text`
  flex: 1;
  text-align: center;
  text-transform: uppercase;
  align-items: center;
  color: ${({ theme }) => theme.COLORS.black};
`

export const DeviceModal = styled.TouchableOpacity`
  margin-top: ${RFValue(16)}px;
  padding: ${RFValue(8)}px;
`

export const DeviceTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.black};
`

export const TesteButton = styled.TouchableOpacity`
  border: 1px solid red;
  padding: 16px;
  background: red;
`

export const BgLinearGradient = styled(LinearGradient)`
  flex: 1;
`