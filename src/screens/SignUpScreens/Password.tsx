import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import InputButton from '../../components/InputButton';
import { useAuth } from '../../contexts/Auth';
import { ValidarPassword } from '../../components/Checks';
import {
    Container,
    InputArea,
    HeaderArea,
    PassowordInfo,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function PasswordScreen(email){
    
    const {signUp} = useAuth();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(1);
    const [infoPassword, setInfoPassword] = useState(false);
    const [infoConfirmPassword, setInfoConfirmPassword] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const userEmail = email['route']['params']['email'];

    useEffect(() => {

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

        const allFilledCorrect = passwordValidate === 3 && confirmPasswordValidate === 3
        {allFilledCorrect ? setDisabledButton(false) : setDisabledButton(true)}

        if (passwordValidate === 2) {setInfoPassword(true)} else {setInfoPassword(false)}

    }, [password, confirmPassword, confirmPasswordValidate, passwordValidate])

    function handleButtonPressReturnSignIn(){
        navigation.navigate('SignIn');
    }

    function handleButtonPressSignUp(){
        setIsLoading(true);
        signUp(userEmail, password);
        setIsLoading(false);

    }


    return(
            <Container>
                <HeaderArea></HeaderArea>
                <SpreadLogo width="100%" height={120} ></SpreadLogo>
                <InputArea>
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
                    <Button 
                        isLoading={loading} 
                        title='Finalizar Cadastro' 
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