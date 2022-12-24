import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';

import * as Client from '../screens/Client';

const Stack = createStackNavigator();

const AppRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Device"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={Client.Home} />
      <Stack.Screen name="Profile" component={Client.Profile} />
      <Stack.Screen name="EditProfile" component={Client.EditProfile} />
      <Stack.Screen name="Device" component={Client.Device} />
      <Stack.Screen name="Tutorials" component={Client.Tutorials} />
      <Stack.Screen name="SettingsEarphone" component={Client.SettingsEarphone} />
      <Stack.Screen name="Preset" component={Client.Preset} />
      <Stack.Screen name="School" component={Client.School} />
      <Stack.Screen name="Personalities" component={Client.Personalities} />
      <Stack.Screen name="FrequentlyQuestions" component={Client.FrequentlyQuestions} />
      <Stack.Screen name="ChangePassword" component={Client.ChangePassword} />
      <Stack.Screen name="PasswordResetSuccess" component={Client.PasswordResetSuccess} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
