import styled from 'styled-components/native';
import { Image } from 'react-native';
import { scale } from 'react-native-size-matters';

export const Container = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;



export const ContainerSocial = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	align-items: center;
	justify-content: space-around;
	flex-direction: row;
`;

export const ImageProfile = styled(Image)`
	width: ${scale(192)}px;
	height: ${scale(192)}px;
	border-radius: ${scale(256)}px;
	margin-left: auto;
	margin-right: auto;
`;
export const ButtonExternalLink = styled.TouchableOpacity``;

export const LogoSocial = styled(Image)``;
