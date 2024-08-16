import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { scale } from 'react-native-size-matters';

import styled from 'styled-components/native';

export const Container = styled(KeyboardAwareScrollView)`
	background-color: #fff;
	padding-left: ${scale(16)}px;
	padding-right: ${scale(16)}px;
`;
