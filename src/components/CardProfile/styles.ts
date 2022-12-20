import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
width: ${RFValue(104)}px;
height: ${RFValue(29)}px;
`;

export const ImageBackground = styled.Image`
`;

export const Title = styled.Text`
position: absolute;
left: ${RFValue(20)}px;
top: ${RFValue(10)}px;
font-size: ${RFValue(14)}px;
text-align: center;
color:${({ theme }) => theme.COLORS.white_100};
text-transform: uppercase;
`;