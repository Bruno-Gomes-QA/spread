import { Container, ButtonArea } from './style';
import Button from '../../components/Button';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/Auth';
import { userComplete, setNewUserData } from '../../services/firestoreService'
import React = require('react');

export function HomeScreen(){

    const {checkCurrentUser} = useAuth()
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const user = checkCurrentUser()
    var userExist
    userComplete(user).then((value) => {
        userExist = value
    }).catch((error) => {
        error
    });
    const [xpto, setXpto] = useState(false);

    useEffect(() =>{
        if(user && userExist){
            setIsLoading(false)
        } else {
            setIsLoading(true)
            setNewUserData(user)
            setIsLoading(false)
        }
    },[])

    function handleButtonPressSettings(){

        setIsLoading(true);
        setXpto(true)
        console.log('Pressionando');
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        navigation.navigate('Settings')
    }

    return(
        <Container>
            <ButtonArea>
                <Button 
                    isLoading={loading}
                    title='Configurações' 
                    onPressIn={handleButtonPressSettings}
                    disabled={false}
                />  
            </ButtonArea>
        </Container>
    );
}