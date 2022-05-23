import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen } from '../screens/LoadingScreen/LoadingScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen/WelcomeScreen';
import { CodeSlideScreen } from '../screens/CodeSlideScreen/CodeSlideScreen';
import { SignInScreen } from '../screens/SignInScreens/SignInScreen';
import { RecoverMeScreen } from '../screens/SignInScreens/RecoverMeScreen';
import { TermsAndConditionsScreen } from '../screens/SignUpScreens/TermsAndConditionsScreen';
import { EmailandNumberScreen } from '../screens/SignUpScreens/EmailandNumberScreen';
import { CpfFullNameScreen } from '../screens/SignUpScreens/CpfFullNameScreen';
import { AndressScreen } from '../screens/SignUpScreens/AndressScreen';
import { PasswordScreen } from '../screens/SignUpScreens/Password';

const Stack = createNativeStackNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
            <Stack.Screen name="CodeSlideScreen" component={CodeSlideScreen}/>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>    
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="RecoverMe" component={RecoverMeScreen}/>
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen}/>
            <Stack.Screen name="EmailandNumber" component={EmailandNumberScreen}/>
            <Stack.Screen name="CpfFullName" component={CpfFullNameScreen}/>
            <Stack.Screen name="Andress" component={AndressScreen}/>
            <Stack.Screen name="Password" component={PasswordScreen}/>
        </Stack.Navigator>
    )
}