import { scale } from 'react-native-size-matters';
import styled from 'styled-components/native';


export const ContainerConnections = styled.View`
	background: #fff;
	align-items: center;
	justify-content: space-between;
	flex-direction: row;
	padding: ${scale(8)}px;
	border-radius: 8px;
	margin-left: ${scale(16)}px;
	margin-right: ${scale(16)}px;
  height: ${scale(51)}px;
	margin-bottom: 16px;
`;
