import { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import LottieView from 'lottie-react-native';
import { UserExist } from '../../services/firestoreService';
import { setNewEmail, validateCode } from '../../services/emailService';
import { ValidarEmail, FormatarNumber } from '../../components/Checks';
import SpreadLogo from "../../../assets/spreadname.svg";
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import InputButton from '../../components/InputButton';
import {
    Container,
    InputArea,
    HeaderArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
    ModalArea,
    ModalTitle,
    ModalText,
} from './style';

export function EmailandNumberScreen(){
    
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [emailValidate, setEmailValidate] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [numberValidate, setNumberValidate] = useState(1);
    const [confirmationCode, setConfirmationCode] = useState('')
    const [valideConfirmationCode, setValideConfirmationCode] = useState(1)
    const [disabledButton, setDisabledButton] = useState(true);
    const [disabledSecondButton, setDisabledSecondButton] = useState(true);
    const [userExist, setUserExist] = useState(false);
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {

        setPhoneNumber(FormatarNumber(phoneNumber))
        setEmailValidate(ValidarEmail(email))
        setEmail(email.toLowerCase())

        if (phoneNumber.length === 15) {
            setNumberValidate(3)
        } else if (phoneNumber === '') {
            setNumberValidate(1)
        } else {
            setNumberValidate(2)
        }
        const correctFilled = numberValidate === 3 && emailValidate === 3
        {correctFilled ? setDisabledButton(false) : setDisabledButton(true)}

    }, [email, phoneNumber, numberValidate, emailValidate])

    useEffect(() => {
        handleButtonPressContinueCode()
    }, [confirmationCode])

    async function handleButtonPressContinueCode() {
        if (confirmationCode.length > 5) {
            const valideCode = await validateCode(email, confirmationCode)
            {valideCode ? setDisabledSecondButton(false) : setDisabledSecondButton(true)}
            {valideCode ? setValideConfirmationCode(3) : setValideConfirmationCode(2)}
        } else if (confirmationCode === ''){
            setValideConfirmationCode(1)
        } else {
            setValideConfirmationCode(2)
            setDisabledSecondButton(true)
        }
    }

    async function handleButtonPressContinue(){
        setUserExist(await UserExist(email, phoneNumber, 1))
        if (userExist) {
            modalizeRef.current?.open()
        } else {
            setConfirmationCode('')
            setNewEmail(email)
            modalizeRef.current?.open()
            setIsLoading(true);
            setIsLoading(false);
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
            <SignMessageButton onPressIn={() => navigation.navigate('SignIn')}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Entrar</SignMessageButtonTextBold>
            </SignMessageButton>
            <Modalize
                ref={modalizeRef}
                withHandle={false}
                adjustToContentHeight={true}
            >
                {userExist ? 
                    <ModalArea>
                        <ModalTitle>
                            Usuário já cadastrado
                        </ModalTitle> 
                        <LottieView
                            source={require('../../../assets/user_found.json')}
                            autoPlay={true}
                            loop={false}
                            style={{height: 160, width: 160}}
                        />
                        <ButtonWhite
                            title={"Entrar"}
                            onPressIn={() => navigation.navigate('SignIn')}
                            isLoading={false}
                            disabled={false}
                        ></ButtonWhite>
                        <Button 
                            isLoading={false} 
                            title='Tentar novamente'
                            onPressIn={() => modalizeRef.current?.close()}
                            disabled={false}
                        />
                    </ModalArea>
                :
                    <ModalArea>
                        <ModalTitle>
                            Confirme seu E-mail
                        </ModalTitle>
                        <ModalText>
                            Enviamos um código de confirmação para seu e-mail, preencha o campo abaixo com este código para continuar seu cadastro.
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
                            isLoading={false} 
                            title='Confirmar'
                            onPressIn={() => navigation.navigate('CpfFullName', {params: {email: email, phoneNumber: phoneNumber}})}
                            disabled={disabledSecondButton}
                        />    
                    </ModalArea>
                }
            </Modalize>
        </Container>
    );
}