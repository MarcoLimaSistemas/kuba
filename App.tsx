
import React, { useEffect } from 'react'

import { AppProvider } from './src/hooks'
import { Routes } from './src/routes'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'

import {gestureHandlerRootHOC} from 'react-native-gesture-handler'

const App =()=> {

  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    <>
      <StatusBar
        animated={true}
        translucent={true}
        backgroundColor='transparent'
        barStyle='dark-content'
      />
      <AppProvider>
        <Routes />
      </AppProvider>
    </>
  )
}

export default gestureHandlerRootHOC(App)