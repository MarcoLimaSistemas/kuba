import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface Props {
  activeButtonGoBack?: boolean;
}

//Header shadow
export const ContainerIHeaderShadow = styled.View`
width: 100%;
overflow: hidden;
padding-bottom: 5px;
margin-bottom: 10px;
`;

export const ContainerLogo = styled.View<Props> `
width: ${({ activeButtonGoBack }) => activeButtonGoBack ? '80%' : '100%'};
justify-content: center;
margin-top: 18px;
`;

export const Title = styled.Text`
text-align: justify;
color: ${({ theme }) => theme.COLORS.black};
font-size:${RFValue(25)}px;
margin-left: 21px;
`
export const ContainerShadow = styled.View`
width: 100%;
height: 93px;
flex-direction: row;   
`;


export const ButtonBack = styled.TouchableOpacity`
align-items: center;
justify-content: center;
margin-left: 26px;
margin-top: ${RFValue(17)}px;
`;
