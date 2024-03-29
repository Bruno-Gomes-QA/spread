import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoadingScreen } from '../screens/LoadingScreen/LoadingScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { CodeSlideScreen } from '../screens/CodeSlideScreens/CodeSlideScreen';
import { PaymentStatusScreen } from '../screens/CodeSlideScreens/PaymentStatusScreen';
import { MercadoPagoScreen } from '../screens/CodeSlideScreens/MercadoPagoScreen';
import { SettingsScreen } from '../screens/SettingsScreen/SettingsScreen';
import { PixScreen } from '../screens/PixScreen/PixScreen';
import { IndicacoesScreen } from '../screens/IndicacoesScreen/IndicacoesScreen';
import { IdeiasScreen } from '../screens/IdeiasScreen/IdeiasScreen';

export function AppStack(){

    const Stack = createNativeStackNavigator();

        return(
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >   
                <Stack.Screen name="Loading" component={LoadingScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="CodeSlide" component={CodeSlideScreen}/>
                <Stack.Screen name="PaymentStatus" component={PaymentStatusScreen}/>
                <Stack.Screen name="MercadoPago" component={MercadoPagoScreen}/>
                <Stack.Screen name="Settings" component={SettingsScreen}/>
                <Stack.Screen name="Pix" component={PixScreen}/>
                <Stack.Screen name="Indicacoes" component={IndicacoesScreen}/>
                <Stack.Screen name="Ideias" component={IdeiasScreen}/>
            </Stack.Navigator>
        )
}