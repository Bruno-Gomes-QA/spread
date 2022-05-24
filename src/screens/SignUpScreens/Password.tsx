import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import InputButton from '../../components/InputButton';
import { useAuth } from '../../contexts/Auth';
import CheckBox from '../../components/CheckBox';
import { ValidarPassword } from '../../components/Checks';
import {
    Container,
    InputArea,
    HeaderArea,
    PassowordInfo,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    RecoverMeArea,
} from './style';
import { setNewUserData } from '../../services/firestoreService';

export function PasswordScreen(params){
    
    const {signUp} = useAuth();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(1);
    const [infoPassword, setInfoPassword] = useState(false);
    const [infoConfirmPassword, setInfoConfirmPassword] = useState(false);
    const [isSelected, setSelection] = useState(true);
    const [disabledButton, setDisabledButton] = useState(false);
    const email = params['route']['params']['params']['email'];
    const phoneNumber = params['route']['params']['params']['phoneNumber'];
    const cpf = params['route']['params']['params']['cpf'];
    const fullName = params['route']['params']['params']['fullName'];
    const birthDay = params['route']['params']['params']['birthDay'];
    const cep = params['route']['params']['params']['cep'];
    const state = params['route']['params']['params']['state'];
    const city = params['route']['params']['params']['city'];
    const district = params['route']['params']['params']['district'];
    const street = params['route']['params']['params']['street'];
    
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
        setNewUserData(email, password, phoneNumber, cpf, fullName, birthDay, cep, state, city, district, street)
        signUp(email, password);
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
                        password={isSelected}
                        maxLength={100}
                        keyboardType={"default"}
                        validate={confirmPasswordValidate}
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