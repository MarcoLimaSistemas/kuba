import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import * as Guest from '../screens/Guest';

const Stack = createStackNavigator();

const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="SignIn" component={Guest.SignIn} />
      <Stack.Screen name="SignUp" component={Guest.SignUp} />
      <Stack.Screen
        name="ScreenSuccessful"
        component={Guest.ScreenSuccessful}
      />
    </Stack.Navigator>
  );
};

export default AuthRoutes;
