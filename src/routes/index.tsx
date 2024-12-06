import React from 'react';
import Toast from 'react-native-toast-message';

import AppRoutes from './app.routes';


import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../config/RootNavigation';


export const Routes = () => {
	return (
		<>
			<NavigationContainer ref={navigationRef}>
				<AppRoutes /> 
			</NavigationContainer>
			<Toast />
		</>
	);
};
