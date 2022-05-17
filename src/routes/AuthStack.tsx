import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen/WelcomeScreen';
import { SignInScreen } from '../screens/SignInScreen/SignInScreen';
import { LoadingScreen } from '../screens/LoadingScreen/LoadingScreen';
import { TermsAndConditionsScreen } from '../screens/SignUpScreens/TermsAndConditionsScreen';
import { EmailandNumberScreen } from '../screens/SignUpScreens/EmailandNumberScreen';
import { CpfFullNameScreen } from '../screens/SignUpScreens/CpfFullNameScreen';
import { AndressScreen } from '../screens/SignUpScreens/AndressScreen';
import { PasswordScreen } from '../screens/SignUpScreens/Password';
import { SignInitScreen } from '../screens/SignInitScreen/SignInitScreen';

const Stack = createNativeStackNavigator();

export function AuthStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="LoadingScreen">
                {props => <LoadingScreen extraData={true} />}
            </Stack.Screen>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>    
            <Stack.Screen name="SignIn" component={SignInScreen}/>
            <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen}/>
            <Stack.Screen name="EmailandNumber" component={EmailandNumberScreen}/>
            <Stack.Screen name="CpfFullName" component={CpfFullNameScreen}/>
            <Stack.Screen name="Andress" component={AndressScreen}/>
            <Stack.Screen name="Password" component={PasswordScreen}/>
            <Stack.Screen name="SignInit" component={SignInitScreen}/>
        </Stack.Navigator>
    )
}