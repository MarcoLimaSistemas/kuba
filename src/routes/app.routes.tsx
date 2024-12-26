import React from 'react';
import {
	CardStyleInterpolators,
	createStackNavigator
} from '@react-navigation/stack';

import * as Client from '../screens/Client';
import { BluetoothProvider } from '../context/BluetoothContext';

const Stack = createStackNavigator();

const AppRoutes = () => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
			}}>
			{/* <Stack.Screen
				name="Home"
				component={Client.Home}
			/> */}
			{/* <Stack.Screen name="Profile" component={Client.Profile} />
			<Stack.Screen name="ProfileView" component={Client.ProfileView} />
			<Stack.Screen name="EditProfile" component={Client.EditProfile} />  */}

			<Stack.Screen
				name="HomeScreen"
				component={Client.HomeScreen}
			/>
			<Stack.Screen
				name="Device"
				component={Client.Device}
			/>

			{/* <Stack.Screen name="Tutorials" component={Client.Tutorials} />
			<Stack.Screen
				name="SettingsEarphone"
				component={Client.SettingsEarphone}
			/>
			<Stack.Screen name="School" component={Client.School} />
			*/}
			<Stack.Screen name="Preset" component={Client.Preset}
			/>
			<Stack.Screen
				name="Personalities"
				component={Client.Personalities}
			/>
			<Stack.Screen name="Profiles" component={Client.Profiles} />
			{/* <Stack.Screen
				name="FrequentlyQuestions"
				component={Client.FrequentlyQuestions}
			/>
			<Stack.Screen
				name="ChangePassword"
				component={Client.ChangePassword}
			/>
			<Stack.Screen
				name="PasswordResetSuccess"
				component={Client.PasswordResetSuccess}
			/>

			<Stack.Screen name="Support" component={Client.Support} />
			<Stack.Screen
				name="SupportSuccess"
				component={Client.SupportSuccess}
			/> */}
		</Stack.Navigator>
	);
};

export default AppRoutes;
