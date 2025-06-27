import { MotiView } from 'moti';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Wrapper = styled(MotiView)`
flex: 1;
padding-top: ${scale(16)}px;
`;

export const Container = styled.ScrollView`
	background: #f4f2f2;
`;
export const ContainerEqualizer = styled.View`
	margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px; 
	background-color:${({ theme }) => theme.COLORS.white_100} ;
	padding:  ${scale(16)}px;
	border-top-left-radius: ${scale(16)}px;
	border-top-right-radius: ${scale(16)}px;	
`;

export const ContainerImg = styled(MotiView)`
	height: ${scale(200)}px;
	justify-content: center;
	align-items: center;
`;

export const ContainerCarousel = styled.View`
	background: #fff;
	margin-left: ${scale(8)}px;
	margin-right: ${scale(8)}px; 
	padding: ${scale(8)}px;
	border-bottom-left-radius:${scale(16)}px;
	border-bottom-right-radius:${scale(16)}px;
	margin-bottom: 8px;


`;

export const BoxButtons = styled.View`
	flex-direction: row;
	justify-content: center;

`;

export const Button = styled.TouchableOpacity<{ isReset: boolean }>`

	padding: ${scale(6)}px ${scale(12)}px ;
	align-items: center;
	justify-content: center;
	margin-right: ${scale(12)}px ;
	background-color: ${({theme,isReset})=> isReset ? theme.COLORS.white_200 : theme.COLORS.gold_500} ;
	border-radius: ${scale(62)}px;
`;

export const Footer = styled.View`
	padding: ${scale(16)}px;
`;

export const ContainerConnections = styled.View`
	background: #fff;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: ${scale(8)}px;
	border-radius: 8px;
	margin-left: ${scale(16)}px;
	margin-right: ${scale(16)}px;
	margin-bottom: 16px;
`;

export const ContainerPresets = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
	margin-top: ${scale(8)}px;
`;
