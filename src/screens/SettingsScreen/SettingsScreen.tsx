import React from 'react';
import { Container, ButtonArea } from './style';
import Button from '../../components/Button';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';

export function SettingsScreen(){

    const {signOut} = useAuth()
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);

    function handleButtonPressSignOut(){
        setIsLoading(true);
        console.log('Pressionando');
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        signOut();
    }

    function handleButtonPressBack(){
        setIsLoading(true);
        console.log('Pressionando');
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        navigation.navigate('Home');
    }
    return(
        <Container style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ButtonArea>
                <Button 
                    isLoading={loading}
                    title='Sair do App' 
                    onPressIn={handleButtonPressSignOut}
                    disabled={false}
                />
            </ButtonArea>
            <ButtonArea>
                <Button 
                    isLoading={loading}
                    title='Volta para tela inicial' 
                    onPressIn={handleButtonPressBack}
                    disabled={false}
                />
            </ButtonArea>
        </Container>
    );
}