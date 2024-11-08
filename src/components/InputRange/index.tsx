// import React, { useMemo, useRef } from 'react';


// import { View, StyleSheet, TextInput } from 'react-native';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Svg, { Line } from 'react-native-svg';
// import { Flex } from 'native-base';

// interface InputRangeProps {
//   hertz: string;
//   minValue: number;
//   maxValue: number;
//   onChangeCurrent: (v: any) => void;
// }
// const Height = 316
// const MaxHeight = Height - 16

// const {
//   View: AView,
//   Value,
//   event,
//   set,
//   block,
//   cond,
//   lessThan,
//   greaterThan,
//   add,
//   eq,
//   createAnimatedComponent,
//   useCode,
//   call
// } = Animated

// const ALine = createAnimatedComponent(Line)
// const AText = createAnimatedComponent(TextInput)

// const usePanGesture = (initialPosition: number) => {
//   const transY = useRef(new Value(initialPosition)).current
//   const offSetY = useRef(new Value(initialPosition)).current

//   const onGestureHandler = useMemo(() => {
//     return event([
//       {
//         nativeEvent: ({ translationY: y, state }: any) =>
//           block([
//             cond(lessThan(add(offSetY, y), 0), set(transY, 0), [
//               cond(
//                 greaterThan(add(offSetY, y), MaxHeight),
//                 set(transY, MaxHeight),
//                 set(transY, add(offSetY, y)),
//               ),
//             ]),
//             cond(eq(state, State.END), set(offSetY, add(offSetY, y)))
//           ])
//       }
//     ])
//   }, [transY, offSetY])

//   return {
//     transY,
//     onGestureHandler
//   }
// }

// export function PanComponent(initialPosition: number) {
//   const { transY, onGestureHandler } = usePanGesture(initialPosition)


//   const Pan = () => (
//     <PanGestureHandler
//       onGestureEvent={onGestureHandler}
//       onHandlerStateChange={onGestureHandler}
//     >
//       <AView style={[styles.Knob, { transform: [{ translateY: transY }] }]} />
//     </PanGestureHandler>
//   )

//   return {
//     Pan, transY
//   }
// }

// export function InputRange({ minValue, maxValue, onChangeCurrent, hertz }: InputRangeProps) {
//   const current = useRef(null)
//   const { Pan, transY } = PanComponent(150)

//   useCode(() => [
//     call([transY], ([value]) => {
//       if (current.current) {
//         onChangeCurrent(Math.floor(minValue + (value / MaxHeight) * (maxValue - minValue)))
//         current.current.setNativeProps({
//           text: `${Math.floor(minValue + (value / MaxHeight) * (maxValue - minValue))}`
//         })
//       }
//     })
//   ], [transY])

//   return (
//     <Flex alignItems='center' justifyContent='center' mb={8}>
//       <AText editable={false} ref={current} style={styles.label} />
//       <View style={styles.Container}>
//         <View style={styles.Rail} />
//         <View style={{ position: 'absolute' }}>
//           <Svg height={Height} width={6}>
//             <ALine
//               stroke='#b9bed1'
//               strokeWidth='12'
//               x1={0}
//               x2={0}
//               y1={transY}
//               y2={0}
//             />
//           </Svg>
//         </View>
//         <Pan />
//       </View>
//       <TextInput defaultValue={hertz} editable={false} />
//     </Flex>
//   )
// }

// const styles = StyleSheet.create({
//   Container: {
//     width: 24,
//     height: Height,
//     marginHorizontal: 16,
//     marginBottom: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   Rail: {
//     backgroundColor: '#000',
//     position: 'absolute',
//     width: 6,
//     height: Height,
//     borderRadius: 6,
//   },
//   Knob: {
//     height: 16,
//     width: 16,
//     borderRadius: 8,
//     backgroundColor: '#000',
//     position: 'absolute',
//     top: 0,
//     elevation: 5,
//     // ios
//     shadowColor: '#000',
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//     shadowOffset: {
//       height: 2,
//       width: 0
//     },
//   },
//   label: {
//     fontSize: 16,
//     color: '#777',
//     textAlign: 'center',
//   }
// })
