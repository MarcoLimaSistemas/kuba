import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`

`;
export const Image = styled.Image` 

`;
export const ContainerImage = styled.View`

`;
export const Box = styled.View`
align-items: center;
justify-content: center;
padding: 40px 16px;
`;

export const BoxLogo = styled.Text`
height: 100%;
position: absolute;
left: 20px;
top: 25px;
`;

export const BoxPerfil = styled.TouchableOpacity`
height: 70px;
display: flex;
align-items: center;
justify-content: center;
position: absolute;
right: 20px;
top: 9px;
`;

export const Title = styled.Text`
position: absolute;
left: ${RFValue(16)}px;
top: ${RFValue(140)}px;

font-weight: 300;
font-size:  ${RFValue(16)}px;
color: ${({ theme }) => theme.COLORS.white_100};
`;

export const SubTitle = styled.Text`
position: absolute;
left: ${RFValue(16)}px;
top: ${RFValue(170)}px;

font-size:  ${RFValue(16)}px;
color: ${({ theme }) => theme.COLORS.white_100};
`;

export const TitleSecondary = styled.Text`
position: absolute;
left: ${RFValue(80)}px;
top: ${RFValue(65)}px;

font-size:  ${RFValue(16)}px;
text-transform: uppercase;
color: ${({ theme }) => theme.COLORS.white_100};
letter-spacing:${RFValue(8)}px;
`;
export const SubTitleSecondary = styled.Text`
position: absolute;
left: 56px;
top: 90px;

font-size:  ${RFValue(16)}px;
font-weight: 300;
color: ${({ theme }) => theme.COLORS.white_100};
`;

export const ContainerCarousel = styled.View`
width: 100%;
height: 500px;
`;

export const ContainerCard = styled.View`
margin-top: 40px;
margin-left: 4px;
width: 100%; 

height: 189px;

`;

export const TitleCarousel = styled.Text`
font-size:  ${RFValue(20)}px;
color: ${({ theme }) => theme.COLORS.gray_100};
padding-left: 16px;
margin: 5px;

`;

export const ContainerModal = styled.View`  
height:75%;
margin-top: 60%;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
padding: 16px 16px 32px;
gap: ${RFValue(56)}px;
border-radius: 16px;
background-color:  ${({ theme }) => theme.COLORS.white_100};
`;
export const IconClose = styled.View` 
align-items: flex-end;
`;
export const TitleModal = styled.Text`  
font-size:  ${RFValue(24)}px;
text-transform: uppercase;
text-align: center;
color: ${({ theme }) => theme.COLORS.black};
margin-top: 40px;


`;
export const SubTitleModal = styled.Text` 
font-size:  ${RFValue(18)}px;
font-weight: 600;
text-align: center;
color: ${({ theme }) => theme.COLORS.gray_100};
margin-bottom: 16px;
`;