
import Animated from 'react-native-reanimated';
import {scale} from 'react-native-size-matters';
import styled from 'styled-components/native';

export const Container = styled.View``;

export const WrapperSwitch = styled.Pressable``;

export const Track = styled(Animated.View)`
  align-items: "flex-start";
  width: ${scale(52)}px;
  height: ${scale(28)}px;
  padding: ${scale(5)}px;
`;
export const Thumb = styled(Animated.View)`
  height: 100%;
  aspect-ratio: 1;
  background-color: ${({theme})=> theme.COLORS.white_100};
`;
