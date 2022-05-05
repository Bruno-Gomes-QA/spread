import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/SignInScreen/SignInScreen';
import { PreloadScreen } from '../screens/PreloadScreen/PreloadScreen';
import { SignUpScreen } from '../screens/SignUpScreen/SignUpScreen';
import { ConfirmEmailScreen } from '../screens/ConfirmEmailScreen/ConfirmEmailScreen';
import { SignInitScreen } from '../screens/SignInitScreen/SignInitScreen';

const Stack = createNativeStackNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator
            initialRouteName='Preload'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="Preload" 
                component={PreloadScreen}
                />    
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="SignInit" component={SignInitScreen}/>
            <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
        </Stack.Navigator>
    )
}