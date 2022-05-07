import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen/SettingsScreen';
import { CodeSlideScreen } from '../screens/CodeSlideScreen/CodeSlideScreen';

const Stack = createNativeStackNavigator();

export function AppStack(){
    return(
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >   
            <Stack.Screen name="CodeSlide" component={CodeSlideScreen}/>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Settings" component={SettingsScreen}/>
        </Stack.Navigator>
    )
}