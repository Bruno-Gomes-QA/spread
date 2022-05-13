import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/SignInScreen/SignInScreen';
import { LoadingScreen } from '../screens/LoadingScreen/LoadingScreen';
import { SignUpScreen } from '../screens/SignUpScreen/SignUpScreen';
import { SignInitScreen } from '../screens/SignInitScreen/SignInitScreen';

const Stack = createNativeStackNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen 
                name="LoadingScreen" 
                component={LoadingScreen}
                />    
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="SignUp" component={SignUpScreen}/>
            <Stack.Screen name="SignInit" component={SignInitScreen}/>
        </Stack.Navigator>
    )
}