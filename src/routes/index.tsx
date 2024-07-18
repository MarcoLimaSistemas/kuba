import React from 'react'
import Toast from 'react-native-toast-message'

import AppRoutes from './app.routes'
import AuthRoutes from './auth.routes'

import {NavigationContainer} from '@react-navigation/native'
import {navigationRef} from '../config/RootNavigation'
import {useAuth} from '../hooks/auth'

export const Routes = () => {
    const {user} = useAuth()
    console.log('ID', user?.id)

    return (
        <>
            <NavigationContainer ref={navigationRef}>
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
            <Toast />
        </>
    )
}
