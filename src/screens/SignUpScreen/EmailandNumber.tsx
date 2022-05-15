import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import CheckBox  from '../../components/CheckBox'
import InputButton from '../../components/InputButton';
import { useAuth } from '../../contexts/Auth';
import { ValidarEmail, ValidarPassword } from '../../components/Checks';
import {
    Container,
    InputArea,
    HeaderArea,
    PassowordInfo,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function SignUpScreen(){
    
    const {signUp} = useAuth();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValidate, setEmailValidate] = useState(1);
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(1);
    const [infoPassword, setInfoPassword] = useState(false);
    const [infoConfirmPassword, setInfoConfirmPassword] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [isSelected, setSelection] = useState(false);

    useEffect(() => {

        setEmailValidate(ValidarEmail(email))
        setPasswordValidate(ValidarPassword(password))
        if (confirmPassword === '') {
            setConfirmPasswordValidate(1)
        } else if (confirmPassword === password) {
            setConfirmPasswordValidate(3)
            setInfoConfirmPassword(false)
        } else {
            setConfirmPasswordValidate(2)
            setInfoConfirmPassword(true)
        }

        const allFilledCorrect = 
        emailValidate === 3 &&
        passwordValidate === 3 &&
        confirmPasswordValidate === 3 &&
        isSelected
        
        if (allFilledCorrect) {
            setDisabledButton(false)          
        } else {
            setDisabledButton(true)
        }

        if (passwordValidate === 2) {
            setInfoPassword(true)
        } else {
            setInfoPassword(false)
        }

    }, [email, password, confirmPassword, isSelected])

    function handleButtonPressReturnSignIn(){
        navigation.navigate('SignIn');
    }

    function handleButtonPressSignUp(){
        setIsLoading(true);
        signUp(email, password);
        setIsLoading(false);

    }

    function handleSelect(){
        if (isSelected === true) {
            setSelection(false)
        } else {
            setSelection(true)
        }

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
                    {infoPassword ? <PassowordInfo>Mínimo 8 caracteres, contendo (A-Z, a-z, 0-9, #?!@$%^&*-)</PassowordInfo> : <></>}
                    <InputButton
                        Icon='lock'
                        placeholder='Digite sua senha'
                        value={password} 
                        onChangeText={setPassword}
                        password={true}
                        maxLength={100}
                        keyboardType={"default"}
                        validate={passwordValidate}
                        autoCapitalize={'none'}
                    />
                    {infoConfirmPassword ? <PassowordInfo>As senhas devem coincidir</PassowordInfo> : <></>}
                    <InputButton
                        Icon='lock'
                        placeholder='Confirme sua senha'
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword}
                        password={true}
                        maxLength={100}
                        keyboardType={"default"}
                        validate={confirmPasswordValidate}
                        autoCapitalize={'none'}
                    />
                    <CheckBox 
                        onPressIn={handleSelect}
                        Check={isSelected}
                        Title={'Termos de Privacidade e Uso'}
                    ></CheckBox>
                    <Button 
                        isLoading={loading} 
                        title='Cadastrar-se' 
                        onPressIn={handleButtonPressSignUp}
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