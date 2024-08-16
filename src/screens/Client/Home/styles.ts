import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

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
  border-radius: ${scale(8)}px;
`;
