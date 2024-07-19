import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const ButtonTutorials = styled.TouchableOpacity`
width: 47%;
`

export const IconButtonTutorials = styled.View`
align-items: center;
justify-content: center;

background-color: ${({ theme }) => theme.COLORS.gold_100};
border-radius: ${RFValue(8)}px;
padding: ${RFValue(16)}px;
`
export const LabelButtonTutorials = styled.Text`
color: ${({ theme }) => theme.COLORS.black};
font-weight: 500;
margin-top: ${RFValue(8)}px;
font-size: ${RFValue(14)}px;
text-align: center;
`