import React from 'react';
import Toast from 'react-native-toast-message';

import AppRoutes from './app.routes';

import { NavigationContainer } from '@react-navigation/native';
import { navigationRef } from '../config/RootNavigation';
import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';

export const Routes = () => {
  const { user } = useAuth();
  console.log('ID', user?.id);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {/* <AuthRoutes /> */}
        {/* <AppRoutes /> */}
        {user?.id ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
      <Toast />
    </>
  );
};
