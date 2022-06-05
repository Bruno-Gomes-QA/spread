import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import SpreadLogo from "../../../assets/spreadname.svg";
import CheckBox from '../../components/CheckBox';
import Button from '../../components/Button';
import InputButton from '../../components/InputButton';
import { useAuth } from '../../contexts/Auth';
import { ValidarPassword, ValidarEmail } from '../../components/Checks';
import {
    Container,
    InputArea,
    HeaderArea,
    PassowordInfo,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ModalTitle,
    ModalText,
    ModalArea,
    RecoverMeArea,
} from './style';
import { setNewEmail, validateCode } from '../../services/emailService';
import { UserExist } from '../../services/firestoreService';
import ButtonWhite from '../../components/ButtonWhite';

export function RecoverMeScreen(){
    
    const { changePassword } = useAuth();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [mailValidate, setEmailValidate] = useState(1);
    const [emailExist, setEmailExist] = useState(false)
    const [password, setPassword] = useState('');
    const [passwordValidate, setPasswordValidate] = useState(1);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordValidate, setConfirmPasswordValidate] = useState(1);
    const [isSelected, setSelection] = useState(true);
    const [infoPassword, setInfoPassword] = useState(false);
    const [infoConfirmPassword, setInfoConfirmPassword] = useState(false);
    const [disabledRecoverButton, setDisabledRecoverButton] = useState(true);
    const [disabledConfirmButton, setDisabledConfirmButton] = useState(true);
    const [disabledSecondButton, setDisabledSecondButton] = useState(true);
    const [confirmationEmail, setConfirmationEmail] = useState(false)
    const [confirmationCode, setConfirmationCode] = useState('')
    const [valideConfirmationCode, setValideConfirmationCode] = useState(1)
    const [valideCode, setValideCode] = useState(false);
    const [editable, setEditable] = useState(true);
    const modalizeRef = useRef<Modalize>(null);
    const modalizeRefEmailnotExist = useRef<Modalize>(null);
    
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
        {allFilledCorrect ? setDisabledRecoverButton(false) : setDisabledRecoverButton(true)}

        if (passwordValidate === 2) {setInfoPassword(true)} else {setInfoPassword(false)}

    }, [password, confirmPassword, confirmPasswordValidate, passwordValidate])

    useEffect(() => {
        setEmail(email.toLowerCase())
        setEmailValidate(ValidarEmail(email))
        emailEffect()
    }, [email, mailValidate])

    async function emailEffect () {
        setEmailExist(false)
        if (mailValidate === 3){
            setEmailExist(await UserExist(email, '', ''))
            setDisabledConfirmButton(false)
        } else {
            setDisabledConfirmButton(true)
        }
    }

    function handleButtonPressReturnSignIn(){
        navigation.navigate('SignIn');
    }

    function handleButtonPressRocoverMe(){
        setIsLoading(true);
        changePassword(email, password);
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);

    }

    function handleButtonPressConfirmation(){
        setEditable(false)
        setIsLoading(true)
        if (emailExist){
            setNewEmail(email)
            setConfirmationCode('')
            modalizeRef.current?.open()
        } else {
            modalizeRefEmailnotExist.current?.open()
        }
        setIsLoading(false)
        setTimeout(() => {
            setEditable(true)
        }, 3000);

    }

    useEffect(() => {
        handleButtonPressContinueCode()
    }, [confirmationCode, valideConfirmationCode, valideCode])

    async function handleButtonPressContinueCode() {
        if (confirmationCode.length > 5) {
             setValideCode(await validateCode(email, confirmationCode))
            {valideCode ? setDisabledSecondButton(false) : setDisabledSecondButton(true)}
            {valideCode ? setValideConfirmationCode(3) : setValideConfirmationCode(2)}
        } else if (confirmationCode === ''){
            setValideConfirmationCode(1)
            setDisabledSecondButton(true)
        } else {
            setValideConfirmationCode(2)
            setDisabledSecondButton(true)
        }
    }

    return(
        <Container>
            <HeaderArea></HeaderArea>
            <SpreadLogo width="100%" height={120} ></SpreadLogo>
            <InputArea>
                <InputButton
                    Icon='mail'
                    placeholder='Informe seu e-mail'
                    value={email} 
                    onChangeText={setEmail}
                    editable={editable}
                    password={false}
                    maxLength={100}
                    keyboardType={"email-address"}
                    validate={mailValidate}
                    autoCapitalize={'none'}
                />
                <Button 
                    isLoading={loading} 
                    title='Enviar Confirmação' 
                    onPressIn={handleButtonPressConfirmation}
                    disabled={disabledConfirmButton}
                />
            </InputArea>
            <SignMessageButton onPressIn={handleButtonPressReturnSignIn}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Entrar</SignMessageButtonTextBold>
            </SignMessageButton>
            <Modalize
                ref={modalizeRef}
                withHandle={false}
                adjustToContentHeight={true}
            >
                {confirmationEmail ? 
                    <InputArea>
                        <ModalTitle>
                            Informe sua nova senha
                        </ModalTitle>
                        {infoPassword ? <PassowordInfo>Mínimo 8 caracteres, contendo (A-Z, a-z, 0-9, #?!@$%^&*-)</PassowordInfo> : <></>}
                        <InputButton
                            Icon='lock'
                            placeholder='Digite sua senha'
                            value={password} 
                            onChangeText={setPassword}
                            password={isSelected}
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
                            ></CheckBox>
                        </RecoverMeArea>
                        <Button 
                            isLoading={loading} 
                            title='Confirmar' 
                            onPressIn={handleButtonPressRocoverMe}
                            disabled={disabledRecoverButton}
                        />
                    </InputArea>
                :
                    <ModalArea>
                        <ModalTitle>
                            Confirme seu E-mail
                        </ModalTitle>
                        <ModalText>
                            Enviamos um código de confirmação para seu e-mail, preencha o campo abaixo com este código para redefinir sua senha.
                        </ModalText>
                        <InputButton
                            Icon='key'
                            placeholder='Informe o código'
                            value={confirmationCode} 
                            onChangeText={setConfirmationCode}
                            password={false}
                            maxLength={6}
                            keyboardType={"phone-pad"}
                            validate={valideConfirmationCode}
                            autoCapitalize={'none'}
                        />
                        <Button 
                            isLoading={loading} 
                            title='Confirmar'
                            onPressIn={() => {valideCode ? setConfirmationEmail(true) : setConfirmationEmail(false)}}
                            disabled={disabledSecondButton}
                        />    
                    </ModalArea>
                }
            </Modalize>
            <Modalize
                ref={modalizeRefEmailnotExist}
                withHandle={false}
                adjustToContentHeight={true}
            >
                <ModalArea>
                    <ModalTitle>
                        E-mail não cadastrado
                    </ModalTitle>
                    <ModalText>
                        O e-mail informado não foi encontrado em nossa base, informe outro e-mail ou cadastre-se
                    </ModalText>
                    <ButtonWhite
                            title={"Informar outro E-mail"}
                            onPressIn={() => console.log(modalizeRefEmailnotExist.current?.close())}
                            isLoading={loading}
                            disabled={false}
                    ></ButtonWhite>
                    <Button 
                        isLoading={loading} 
                        title='Cadastrar-se'
                        onPressIn={() => navigation.navigate('Welcome')}
                        disabled={false}
                    />    
                </ModalArea>
            </Modalize>
        </Container>
    );
}