import { RFValue } from 'react-native-responsive-fontsize';
import { scale } from 'react-native-size-matters';
import styled, { css } from 'styled-components/native';

interface PropsPage {
	active?: boolean;
	opacityIconImage?: boolean;
}

export const Container = styled.TouchableOpacity`
	border-radius: ${scale(8)}px;
	background: rgba(255, 255, 255, 0.8);
	height: ${scale(180)}px;
`;
export const Image = styled.Image<PropsPage>`
	${({ active }) =>
		active
			? css`
					border-radius: 5px;
				`
			: css`
					border-top-left-radius: 8px;
					border-top-right-radius: 8px;
				`};
`;
export const ContainerImage = styled.View`
	width: ${scale(152)}px;
	height: ${scale(152)}px;
	justify-content: center;
	align-items: center;
`;
export const Box = styled.View`
	justify-content: center;
	align-items: center;
	padding: 5px;
`;
