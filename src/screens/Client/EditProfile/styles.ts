import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled(KeyboardAwareScrollView)`
	background-color: ${({ theme }) => theme.COLORS.white_100};
`;

export const BoxPhoto = styled.View`
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
	flex-direction: row;
	align-items: center;
`;

export const Photo = styled.Image`
	width: ${scale(64)}px;
	height: ${scale(64)}px;
	border-radius: ${scale(72)}px;
`;

export const BoxButtons = styled.View`
	margin-top: ${scale(32)}px;
`;

export const TextPhoto = styled.Text`
	margin-left: ${scale(16)}px;
	text-decoration: underline;
	color: ${({ theme }) => theme.COLORS.black};
`;

export const InputsContainer = styled.View`
	flex-direction: column;
	justify-content: center;
	padding: 0 16px 16px;
	margin-top: ${scale(16)}px;
	width: 100%;
`;

export const TextError = styled.Text`
	color: ${({ theme }) => theme.COLORS.red_900};
	margin-top: ${scale(8)}px;
`;

export const ContainerIconModal = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
`;
