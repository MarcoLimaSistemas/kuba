import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
	 /* margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px;  */
	/* background-color:${({theme})=> theme.COLORS.white_100} ;
	padding:  ${scale(16)}px;
	border-radius:${scale(16)}px;
	border: 1px solid red; */
`;
export const ContainerEqualizer = styled.View`
	margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px;
`;




export const ContainerSlider = styled.View`
	align-items: flex-start;
	margin-top: ${scale(16)}px;
	
`;



export const LineSeparator = styled.View`
	height: ${scale(1)}px;
	background: #f0f0f0;
`;