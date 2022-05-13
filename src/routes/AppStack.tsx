import React from 'react';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen } from '../screens/LoadingScreen/LoadingScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { SettingsScreen } from '../screens/SettingsScreen/SettingsScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen/WelcomeScreen';
import { CodeSlideScreen } from '../screens/CodeSlideScreen/CodeSlideScreen';
import { ConfirmAccountScreen } from '../screens/ConfirmAccountScreen/ConfirmAccountScreen';
import { PixScreen } from '../screens/PixScreen/PixScreen';
import { IndicacoesScreen } from '../screens/IndicacoesScreen/IndicacoesScreen';
import { IdeiasScreen } from '../screens/IdeiasScreen/IdeiasScreen';
import { useAuth } from '../contexts/Auth';
import { getUserInfo } from '../services/firestoreService';

export function AppStack(){

    const {checkCurrentUser} = useAuth()
    const Stack = createNativeStackNavigator();
    const [renderViews, setRenderViews] = useState(0)
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        const user = checkCurrentUser();
        getUserInfo(user).then((userInfo) => {
            if (userInfo['first_login']) {
                setRenderViews(2)
            } else {
                setRenderViews(1)
            }
        }).catch((error) => {
            setRetry(!retry)
        });
    },[retry])

    if (renderViews === 1){ 
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >   
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="Pix" component={PixScreen}/>
                <Stack.Screen name="Indicacoes" component={IndicacoesScreen}/>
                <Stack.Screen name="Ideias" component={IdeiasScreen}/>
            </Stack.Navigator>
        )
    } else if (renderViews === 2) {
        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >   
                <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
                <Stack.Screen name="ConfirmAccountScreen" component={ConfirmAccountScreen}/>
                <Stack.Screen name="CodeSlide" component={CodeSlideScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="Pix" component={PixScreen}/>
                <Stack.Screen name="Indicacoes" component={IndicacoesScreen}/>
                <Stack.Screen name="Ideias" component={IdeiasScreen}/>
            </Stack.Navigator>
        )
    } else {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >   
                <Stack.Screen name="LoadingScreen" component={LoadingScreen}/>
            </Stack.Navigator>
        )
    }
}