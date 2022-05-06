import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import CheckBox  from '../../components/CheckBox'
import InputButton from '../../components/InputButton';
import { useAuth } from '../../contexts/Auth';
import { ValidarEmail, ValidarPassword } from '../../components/Checks';
import { setNewUserData } from '../../services/firestoreService';
import {
    Container,
    InputArea,
    HeaderArea,
    LogoArea,
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
    const [disabledButton, setDisabledButton] = useState(false);
    const [isSelected, setSelection] = useState(false);

    useEffect(() => {

        setEmailValidate(ValidarEmail(email))
        setPasswordValidate(ValidarPassword(password))
        setConfirmPasswordValidate(ValidarPassword(confirmPassword))

        const allFilledCorrect = 
        emailValidate === 3 &&
        passwordValidate === 3 &&
        confirmPassword === password &&
        isSelected
        
        if (allFilledCorrect) {
            setDisabledButton(false)          
        } else {
            setDisabledButton(true)
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
                <LogoArea>
                    <SpreadLogo width="100%" height={120} ></SpreadLogo>
                </LogoArea>
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
                        Icon='lock'
                        placeholder='Digite sua senha'
                        value={password} 
                        onChangeText={setPassword}
                        password={true}
                        maxLength={6}
                        keyboardType={"default"}
                        validate={passwordValidate}
                        autoCapitalize={'none'}
                    />
                    <InputButton
                        Icon='lock'
                        placeholder='Confirme sua senha'
                        value={confirmPassword} 
                        onChangeText={setConfirmPassword}
                        password={true}
                        maxLength={6}
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