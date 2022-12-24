import 'react-native-gesture-handler'

import React from 'react'

import { AppProvider } from './src/hooks'
import { Routes } from './src/routes'
import { StatusBar } from 'react-native'

export default function App() {
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