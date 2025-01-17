import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';
import { typography } from '../../../styles/typography';

export const Container = styled.View`
margin-top: ${scale(24)}px ;
`;

export const ContainerEqualizer = styled.View`
  margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px;


`;

export const BoxSlider = styled.View`

width: 100%;
transform: rotate(-90deg);
height: ${scale(64)}px;
margin-left: 10px;
`;

export const ContainerBars = styled.TouchableOpacity`
	//margin-bottom: ${scale(16)}px;
	flex-direction: row;
	justify-content: space-between;
	//border:1px solid red;

`;
export const Circle = styled.View`
	align-items: center;
	justify-content: center;
	width: ${scale(35)}px; 
	height:  ${scale(35)}px; 
	color: ${({ theme }) => theme.COLORS.black};
	border-radius: ${scale(10)}px;
	margin-top: 2px;
	border:2px solid #777777;
`;

export const ButtonCircle = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	width: ${scale(35)}px; 
	height:  ${scale(35)}px; 
	color: ${({ theme }) => theme.COLORS.black};
	border-radius: ${scale(10)}px;
	margin-top: 2px;
	border:2px solid #777777;
`;

export const ContainerInputs = styled.View`
padding: 0 ${scale(8)}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

`;
export const Input = styled.TextInput`
	width: ${scale(42)}px; 
	height:  ${scale(35)}px;
	color: ${({ theme }) => theme.COLORS.black};
	font-family: ${typography['Lato-Regular'].fontFamily};
	font-size: ${scale(14)}px;
padding-left: 4px;
	border-radius: ${scale(10)}px;
	border:2px solid #777777;
	
`;

export const ContainerBar = styled.View`
	align-items: center;

`;

export const ContainerSlider = styled.View`
	align-items: flex-start;
justify-content: center;
	height: ${scale(64)}px;
	margin-top: ${scale(16)}px;
`;

export const ContainerRow = styled.ScrollView`
	width: 100%;
	flex-direction: row;

`;
export const SliderContainer = styled.View`
align-items: center;
width: ${scale(44)}px;
margin-horizontal:2px;
//border: 1px solid red;

`;

