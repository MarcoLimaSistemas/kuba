import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  interpolate,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { AnimatedText } from './AnimatedText';

const { width } = Dimensions.get('window');

export default function  SliderBalloon(){
  const [sliderValue, setSliderValue] = useState(0); // Valor inicial do slider
  const ballPosition = useSharedValue(0); // Posição animada da bolinha
  const knobScale = useSharedValue(0); // Controle de visibilidade da bolinha

  // Valor com animação spring
  const ballonSpringyX = useDerivedValue(() => {
    return withSpring(ballPosition.value);
  });

  // Ângulo do balão
  const ballonAngle = useDerivedValue(() => {
    return (
      90 +
      (Math.atan2(-50, ballonSpringyX.value - ballPosition.value) * 180) /
        Math.PI
    );
  });

  // Estilo animado da bolinha
  const ballonStyle = useAnimatedStyle(() => {
    return {
      opacity: knobScale.value, // Transição de visibilidade
      transform: [
        { translateX: ballonSpringyX.value },
        { scale: knobScale.value },
        {
          translateY: interpolate(knobScale.value, [0, 1], [0, -60]), // Elevação da bolinha
        },
        { rotate: `${ballonAngle.value}deg` }, // Rotação do balão
      ],
    };
  });

  // Callback para o início do movimento
  const handleSlidingStart = () => {
    knobScale.value = withTiming(1); // Mostra a bolinha
  };

  // Callback ao mover o slider
  const handleValueChange = (value: number) => {
    const sliderWidth = width - 40;
    ballPosition.value = (value / 100) * sliderWidth;
    console.log('sliderWidth',sliderWidth,'value',value, ' ball',(value / 100) * sliderWidth);
    runOnJS(setSliderValue)(value);
  };

  // Callback ao soltar o slider
  const handleSlidingComplete = () => {
    knobScale.value = withTiming(0);
  };

  return (
    <View style={styles.container}>
      {/* Bolinha animada */}
      <Animated.View style={[styles.balloon, ballonStyle]}>

        <View style={styles.textContainer}>
            <AnimatedText
              text={sliderValue}
              style={{ color: 'white', fontWeight: '600' }}
            />

          </View>

      </Animated.View>

      {/* Slider */}
      <Slider

        style={{
          width: '100%',
          marginVertical: 12,
          height: 50,
        }}
        minimumValue={0}
        maximumValue={100}
        step={1}
        value={sliderValue}
        onValueChange={handleValueChange}
        onSlidingStart={handleSlidingStart}
        onSlidingComplete={handleSlidingComplete}
        minimumTrackTintColor="#242424"
        maximumTrackTintColor="#656565"
        thumbTintColor="#1EB1FC"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  width:'100%',
  borderWidth:1,
  borderColor:'red',
  },
  textContainer: {
    width: 40,
    height: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'red',
    position: 'absolute',
    top: -10,
  },
  balloon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 4,
    height: 48,
    bottom: 0,
    borderRadius: 2,
   // backgroundColor: '#1EB1FC',
    position: 'absolute',
  },
  balloonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

