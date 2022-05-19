import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import { setCpfFullName, UserExist } from '../../services/firestoreService'
import { FormatarCPF, FormatarData, ValidarFullName, ValidarCPF, ValidarBirthDay } from '../../components/Checks';
import InputButton from '../../components/InputButton';
import {
    Container,
    InputArea,
    LogoArea,
} from './style';

export function CpfFullNameScreen(email){
    
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [cpf, setCPF] = useState('');
    const [cpfValidate, setCpfValidate] = useState(1);
    const [fullName, setFullName] = useState('');
    const [fullNameValidate, setFullNameValidate] = useState(1);
    const [birthDay, setBirthDay] = useState('');
    const [birthDayValidate, setBirthDayValidate] = useState(1);
    const [disabledButton, setDisabledButton] = useState(false);
    const userEmail = email['route']['params']['email'];


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
    }, [cpf, cpfValidate, fullName, fullNameValidate, birthDay, birthDayValidate])

    async function handleButtonPressContinue(){
        const userExist = await UserExist('nenhum', 'nenhum', cpf)
        if (userExist) {
            Alert.alert('CPF já cadastrado', 'Informe outro CPF ou realize login')
        } else {       
            setCpfFullName(userEmail, cpf, fullName, birthDay)
                .then((doc) => navigation.navigate('Andress', {email: userEmail}))
                .catch((error) => Alert.alert('Erro desconhecido', 'Tente novamente mais tarde'));
        }
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
                        title='Continuar' 
                        onPressIn={handleButtonPressContinue}
                        disabled={disabledButton}
                    />
                </InputArea>
            </Container>
    );
}