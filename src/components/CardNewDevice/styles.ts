import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
flex: 1;
width: 156px;
height: 189px;
border-radius: 8px;
padding-bottom: 40px;
border-radius: 8px;
background: rgba(255, 255, 255, 0.8);
box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
margin-left: 16px;
margin-right: 16px;
display: flex;
justify-content: center;
align-items: center;
padding-top: 16px;
`;

export const TitleCard = styled.Text`
font-size: ${RFValue(14)}px;
text-align: center;
color:${({ theme }) => theme.COLORS.gray_100};
`