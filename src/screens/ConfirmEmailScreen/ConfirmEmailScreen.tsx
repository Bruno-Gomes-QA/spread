import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import { FormatarCPF, FormatarData, ValidarFullName, ValidarCPF, ValidarBirthDay } from '../../components/Checks';
import InputButton from '../../components/InputButton';
import { setNewUserData } from '../../services/firestoreService';
import { useAuth } from '../../contexts/Auth';
import {
    Container,
    InputArea,
    HeaderArea,
    LogoArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function ConfirmEmailScreen(){
    
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [cpf, setCPF] = useState('');
    const [cpfValidate, setCpfValidate] = useState(1);
    const [fullName, setFullName] = useState('');
    const [fullNameValidate, setFullNameValidate] = useState(1);
    const [birthDay, setBirthDay] = useState('');
    const [birthDayValidate, setBirthDayValidate] = useState(1);
    const [disabledButton, setDisabledButton] = useState(false);
    const {checkCurrentUser} = useAuth();
    var promiseUser;

    useEffect(() => {

        setCPF(FormatarCPF(cpf))
        setBirthDay(FormatarData(birthDay))
        setCpfValidate(ValidarCPF(cpf))
        setFullNameValidate(ValidarFullName(fullName))
        setBirthDayValidate(ValidarBirthDay(birthDay))

        const allFilledCorrect = cpfValidate === 3 && birthDayValidate === 3 && fullNameValidate === 3

        if (allFilledCorrect) {
            setDisabledButton(false)          
        } else {
            setDisabledButton(true)
        }
    }, [cpf, fullName, birthDay])

    function handleButtonPressReturnHome(){
        navigation.navigate('Home');
    }

    function handleButtonPressCompleteSignUp(){
        setIsLoading(true);
        promiseUser = checkCurrentUser()
        console.log(promiseUser)
        setTimeout(() => {
            setNewUserData(promiseUser, cpf, fullName, birthDay)
            setIsLoading(false)
        }, 3000);
    }

    return(
            <Container>
                <LogoArea>
                    <SpreadLogo width="100%" height={120} ></SpreadLogo>
                </LogoArea>
                <InputArea>
                    <InputButton
                        Icon='idcard'
                        placeholder='Digite seu CPF'
                        value={cpf} 
                        onChangeText={setCPF}
                        password={false}
                        maxLength={14}
                        keyboardType={"numeric"}
                        validate={cpfValidate}
                        autoCapitalize={'none'}
                    />
                    <InputButton
                        Icon='user'
                        placeholder='Digite seu nome'
                        value={fullName} 
                        onChangeText={setFullName}
                        password={false}
                        maxLength={100}
                        keyboardType={"default"}
                        validate={fullNameValidate}
                        autoCapitalize={'words'}
                    />
                    <InputButton
                        Icon='calendar'
                        placeholder='Data de Nascimento'
                        value={birthDay} 
                        onChangeText={setBirthDay}
                        password={false}
                        maxLength={10}
                        keyboardType={"numeric"}
                        validate={birthDayValidate}
                        autoCapitalize={'none'}
                    />
                    <Button 
                        isLoading={loading} 
                        title='Finalizar Cadastro' 
                        onPressIn={handleButtonPressCompleteSignUp}
                        disabled={disabledButton}
                    />
                </InputArea>
            </Container>
    );
}