import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
display: flex;
margin-bottom: ${RFValue(16)}px;

`;
export const StyledButton = styled.TouchableOpacity`
align-items: center;
justify-items: center;
width: ${RFValue(100)}px;
height: ${RFValue(56)}px;
background-color: ${({ theme }) => theme.COLORS.gold_100};
border-radius: 8px;

`;
export const Icon = styled(Ionicons)`
margin-top: 10px;
font-size:  ${RFValue(32)}px;

`;
export const Title = styled.Text`
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
font-size: ${RFValue(14)}px ;
padding-top: 12px;
`;
