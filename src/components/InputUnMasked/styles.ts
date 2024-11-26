import styled from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { RFValue } from 'react-native-responsive-fontsize';
import { typography } from '../../styles/typography';
import { scale } from 'react-native-size-matters';


export const InputGroup = styled.View<{	
	marginBottom?: number | undefined
	 }>`
	margin-bottom: ${({ marginBottom }) => (marginBottom ? scale(marginBottom) : scale(16))}px;

`;

export const InputArea = styled.View<{
	height?: number | undefined;
}>`
	border: red;
	flex-direction: row;
	width: 100%;
	border-radius: ${RFValue(8)}px;
	align-items: center;
	height: ${({ height }) => (height ? scale(height) : scale(48))}px;
	border: 2px solid ${({ theme }) => theme.COLORS.black};
	border-radius: ${RFValue(8)}px;
`;

export const InputLabel = styled.Text`
	font-weight: 600;
	font-size: ${RFValue(16)}px;
	color: ${({ theme }) => theme.COLORS.black};
	margin-bottom: ${RFValue(8)}px;
`;

export const InputMasked = styled(TextInputMask)`
	padding-left: ${RFValue(16)}px;
	flex: 1;
`;

export const Input = styled.TextInput<{
	height?: number | undefined;
}>`
	height: ${({ height }) => (height ? scale(height) : scale(48))}px;
	padding-left: ${RFValue(16)}px;
	color: ${({ theme }) => theme.COLORS.black};
	font-family: ${typography['Lato-Regular'].fontFamily};
	flex: 1;

`;

export const Error = styled.Text`
	color: ${props => props.theme.COLORS.red_900};
	font-size: 12px;
	padding: 5px;
`;

export const SignUpButton = styled.TouchableOpacity.attrs({
	activeOpacity: 0.6
})``;

export const TouchableIcon = styled(SignUpButton)`
	height: 100%;
	width: 48px;
	align-items: center;
	justify-content: center;
`;
