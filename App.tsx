import React, {useEffect} from 'react';

import {AppProvider} from './src/hooks';
import {Routes} from './src/routes';
import {StatusBar} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          animated={true}
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <AppProvider>
          <Routes />
        </AppProvider>
      </QueryClientProvider>
    </>
  );
};

export default gestureHandlerRootHOC(App);
