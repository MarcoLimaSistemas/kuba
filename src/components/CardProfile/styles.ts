import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

type Props = {
  isSelected:boolean,

}

export const Container = styled.TouchableOpacity`
	width: ${scale(72)}px;
	height: ${scale(32)}px;
	margin-left: ${scale(8)}px;
	border-radius: ${scale(30)}px;
`;

export const ContainerText = styled.View`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	justify-content: center;
	align-items: center;
`;

export const ImageBackground = styled.Image`
	width: 100%;
	height: 100%;
	border-radius: ${scale(4)}px;
`;
export const Background = styled.View<Props >`
	width: 100%;
	height: 100%;
	border-radius: ${scale(30)}px;
	background-color: ${({ isSelected, theme }) => 
 isSelected 
  ? theme.COLORS.gold_500
  :  theme.COLORS.gray_300};

`;
