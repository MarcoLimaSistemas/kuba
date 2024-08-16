import React from 'react';

import {AppProvider} from './src/hooks';
import {Routes} from './src/routes';
import {StatusBar} from 'react-native';

import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export const queryClient = new QueryClient();

const App = () => {
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
