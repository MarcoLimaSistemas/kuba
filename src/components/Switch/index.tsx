import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  SharedValue,
} from 'react-native-reanimated';
import * as S from './styles';


interface ISwitchProps {
  value: SharedValue<number>;
  onPress: () => void;
  duration?: number;
  trackColors?: {
    on: string;
    off: string;
  };
}
const Switch = ({
  value,
  onPress,
  duration = 400,
  trackColors = {
    on: '#ffff',
    off: '#fff',
  },
}: ISwitchProps) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on],
    );
    const colorBackground = interpolateColor(
      value.value,
      [0, 1],
      ['#777777','#6edc5f'],
    );
    const colorValue = withTiming(color, {duration});

    return {
      backgroundColor: colorBackground,
      borderWidth: 1,
      borderColor: colorValue,
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value.value,
      [0, 1],
      [trackColors.off, trackColors.on],
    );
    const colorValue = withTiming(color, {duration});

    const moveValue = interpolate(
      Number(value.value),
      [0, 1],
      [0, width.value - height.value],
    );
    const translateValue = withTiming(moveValue, {duration});

    return {
      transform: [{translateX: translateValue}],
      borderRadius: height.value / 2,
      backgroundColor: colorValue,
    };
  });

  return (
    <S.WrapperSwitch onPress={onPress}>
      <S.Track
        onLayout={e => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        style={trackAnimatedStyle}>
        <S.Thumb style={thumbAnimatedStyle} />
      </S.Track>
    </S.WrapperSwitch>
  );
};
export default Switch;
