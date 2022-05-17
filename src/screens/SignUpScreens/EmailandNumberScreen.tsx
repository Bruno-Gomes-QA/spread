import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg";
import Button from '../../components/Button';
import InputButton from '../../components/InputButton';
import { ValidarEmail, FormatarNumber } from '../../components/Checks';
import { setNewUserData } from '../../services/firestoreService'
import {
    Container,
    InputArea,
    HeaderArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function EmailandNumberScreen(){
    
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValidate, setEmailValidate] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [numberValidate, setNumberValidate] = useState(1);
    const [disabledButton, setDisabledButton] = useState(true);

    useEffect(() => {

        setPhoneNumber(FormatarNumber(phoneNumber))
        setEmailValidate(ValidarEmail(email))

        if (phoneNumber.length === 15) {
            setNumberValidate(3)
        } else if (phoneNumber === '') {
            setNumberValidate(1)
        } else {
            setNumberValidate(2)
        }

        if (numberValidate === 3 && emailValidate) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
        

    }, [email, phoneNumber, numberValidate, emailValidate])

    function handleButtonPressReturnSignIn(){
        navigation.navigate('SignIn');
    }

    function handleButtonPressContinue(){
        setIsLoading(true);
        setNewUserData(email, phoneNumber)
            .then((doc) => navigation.navigate('CpfFullName', {email: email}))
            .catch((error) => Alert.alert('Erro desconhecido', 'Tente novamente mais tarde'));
        setIsLoading(false);

    }

    return(
            <Container>
                <HeaderArea></HeaderArea>
                <SpreadLogo width="100%" height={120} ></SpreadLogo>
                <InputArea>
                    <InputButton
                        Icon='mail'
                        placeholder='Digite seu melhor e-mail'
                        value={email} 
                        onChangeText={setEmail}
                        password={false}
                        maxLength={100}
                        keyboardType={"email-address"}
                        validate={emailValidate}
                        autoCapitalize={'none'}
                    />
                    <InputButton
                        Icon='phone'
                        placeholder='Digite seu número'
                        value={phoneNumber} 
                        onChangeText={setPhoneNumber}
                        password={false}
                        maxLength={15}
                        keyboardType={"phone-pad"}
                        validate={numberValidate}
                        autoCapitalize={'none'}
                    />
                    <Button 
                        isLoading={loading} 
                        title='Continuar' 
                        onPressIn={handleButtonPressContinue}
                        disabled={disabledButton}
                    />
                </InputArea>
                <SignMessageButton onPressIn={handleButtonPressReturnSignIn}>
                    <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Entrar</SignMessageButtonTextBold>
                </SignMessageButton>
            </Container>
    );
}