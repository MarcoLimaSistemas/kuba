import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const ContainerImage = styled.View``;

export const ContainerHeader = styled.View`
	height: ${scale(208)}px;
`;

export const ImageHeaderHome = styled.Image`
	position: absolute;
	z-index: -101;
`;

export const ContainerSchoolKuba = styled.TouchableOpacity`
	padding: 0 ${scale(16)}px;
`;

export const ImageSchoolKuba = styled.Image`
	width: 100%;
	border-radius: ${RFValue(8)}px;
`;

// modal
export const ContainerModal = styled.View`
	display: flex;
	align-self: flex-end;
	flex-direction: column;
	justify-content: flex-end;

	width: 100%;
	height: 75%;
	bottom: -25%;

	padding: ${RFValue(16)}px ${RFValue(16)}px;

	border-top-left-radius: ${RFValue(16)}px;
	border-top-right-radius: ${RFValue(16)}px;

	background: ${({ theme }) => theme.COLORS.white_100};
`;

export const ImageModalContainer = styled.View`
	width: 100%;
	align-items: center;
`;

export const IconClose = styled.View`
	align-items: flex-end;
`;

export const ButtonModal = styled.Pressable`
	border: red;
	height: ${RFValue(128)}px;
`;
