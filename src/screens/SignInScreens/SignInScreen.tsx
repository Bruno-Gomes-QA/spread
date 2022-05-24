import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import InputButton from '../../components/InputButton';
import { useAuth } from '../../contexts/Auth';
import CheckBox from '../../components/CheckBox';
import { ValidarEmail, ValidarPassword } from '../../components/Checks';
import {
    Container,
    InputArea,
    HeaderArea,
    LogoArea,
    RecoverMeArea,
    InputText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    RecoverPasswordButton,
    RecoverPasswordText,
} from './style';

export function SignInScreen(){

    const {signIn} = useAuth();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [email, setEmail] = useState('');
    const [mailValidate, setEmailValidate] = useState(1);
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(1);
    const [isSelected, setSelection] = useState(true);

    useEffect(() =>{

        setEmailValidate(ValidarEmail(email))
        setPasswordValidate(ValidarPassword(password))

        if (mailValidate === 3 && passwordValidate === 3) {
            setDisabledButton(false)
        } else {
            setDisabledButton(true)
        }
    }, [email, password, mailValidate, passwordValidate])

    function handleButtonPressSignIn(){
        setIsLoading(true);
        signIn(email, password)
        setIsLoading(false);
    }

    function handleButtonPressSignUp(){
        navigation.navigate('WelcomeScreen');
    }

    return(
            <Container>
                <HeaderArea></HeaderArea>
                <LogoArea>
                    <SpreadLogo width="100%" height={120} ></SpreadLogo>
                </LogoArea>
                <InputArea>
                    <InputText>E-mail</InputText>
                    <InputButton
                        Icon='mail'
                        placeholder='Digite seu e-mail'
                        value={email} 
                        onChangeText={setEmail}
                        password={false}
                        maxLength={100}
                        keyboardType={"email-address"}
                        validate={mailValidate}
                        autoCapitalize={'none'}
                    />
                    <InputText>Senha</InputText>
                    <InputButton 
                        Icon='lock'
                        placeholder='********' 
                        value={password} 
                        onChangeText={setPassword}
                        password={isSelected}
                        maxLength={100}
                        keyboardType={"default"}
                        validate={passwordValidate}
                        autoCapitalize={'none'}
                    />
                    <RecoverMeArea>
                        <CheckBox 
                            onPressIn={() => setSelection(!isSelected)}
                            Check={!isSelected}
                            Title={'Exibir Senha'}
                        >
                        </CheckBox>
                    </RecoverMeArea>
                    <Button 
                        isLoading={loading} 
                        title='Entrar' 
                        onPressIn={handleButtonPressSignIn}
                        disabled={disabledButton}
                    />
                    <RecoverPasswordButton
                        onPressIn={() => navigation.navigate('RecoverMe')}
                    >
                        <RecoverPasswordText>Esqueci minha senha</RecoverPasswordText>
                    </RecoverPasswordButton>
                </InputArea>
                <SignMessageButton onPressIn={handleButtonPressSignUp}>
                    <SignMessageButtonText>Ainda não possui uma conta?</SignMessageButtonText>
                    <SignMessageButtonTextBold>Cadastre-se</SignMessageButtonTextBold>
                </SignMessageButton>
            </Container>
    );
}