import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

type ButtonProps = {
  isSelected:boolean
}
export const Container = styled.View`
flex-direction: row;
justify-content: space-between;
`;



export const ContainerText = styled.View`
align-items: center;
justify-content: center;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`

background-color: ${({ isSelected,theme }) => isSelected?theme.COLORS.black:theme.COLORS.white_100};
padding: ${scale(8)}px;
flex-direction: row;
align-items: center;
border-radius: ${scale(16)}px;
margin-top: ${scale(12)}px;
margin-bottom: ${scale(12)}px;
`;