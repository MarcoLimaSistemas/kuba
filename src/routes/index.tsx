import React from 'react';
import Toast from 'react-native-toast-message';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../config/RootNavigation';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';

export const Routes = () => {
	const { user, loading } = useAuth();

	if (loading) {
		return <Loading />;
	}

	return (
		<>
			<NavigationContainer ref={navigationRef}>
				{user ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
			<Toast />
		</>
	);
};
