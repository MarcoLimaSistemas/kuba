import styled from 'styled-components/native';
import { scale } from 'react-native-size-matters';


export const Wrapper = styled.ScrollView`
	padding-top: ${scale(16)}px;
`;

export const Container = styled.View`
	flex: 1;
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	margin-top: ${scale(24)}px;
`;


export const ContainerImage = styled.View`
	height: ${scale(256)}px;
	justify-content: center;
	align-items: center;
`;

export const CardTutorial = styled.View`
	flex-direction: row;
	justify-content: space-between;
`;

export const CardTutorialText = styled.View`
	width: 80%;
	background-color: #fff;
	border-radius: ${scale(8)}px;
	justify-content: center;
	align-items: center;
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	height: ${scale(46)}px;
`;

export const Icon = styled.TouchableOpacity`
	background-color: ${({ theme }) => theme.COLORS.black};

	width: ${scale(46)}px;
	height: ${scale(46)}px;
	border-radius: ${scale(8)}px;

	align-items: center;
	justify-content: center;
`;
