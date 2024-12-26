import { MotiView } from 'moti';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: ${({theme})=> theme.COLORS.gold_80};
`;

export const Wrapper = styled(MotiView)`
  width: 100%;
  align-items: center;
  justify-content: flex-start;
`;

export const Button = styled.TouchableOpacity`
  width: ${scale(136)}px;
  height: ${scale(38)}px;
	padding: ${scale(6)}px ${scale(12)}px ;
	align-items: center;
	justify-content: center;
	margin-right: ${scale(12)}px ;
	background-color: ${({theme,})=> theme.COLORS.white_200} ;
	border-radius: ${scale(62)}px;
  shadow-color: '#000';
  elevation: 5px;
  shadow-opacity: 0.3px;
  shadow-radius: 4px;

`;