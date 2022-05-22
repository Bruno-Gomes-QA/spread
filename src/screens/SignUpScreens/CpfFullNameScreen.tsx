import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modalize } from 'react-native-modalize';
import LottieView from 'lottie-react-native';
import SpreadLogo from "../../../assets/spreadname.svg";
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import { UserExist } from '../../services/firestoreService'
import { FormatarCPF, FormatarData, ValidarFullName, ValidarCPF, ValidarBirthDay } from '../../components/Checks';
import InputButton from '../../components/InputButton';
import {
    Container,
    InputArea,
    LogoArea,
    ModalArea,
    ModalTitle,
} from './style';

export function CpfFullNameScreen(params){
    
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [cpf, setCPF] = useState('');
    const [cpfValidate, setCpfValidate] = useState(1);
    const [fullName, setFullName] = useState('');
    const [fullNameValidate, setFullNameValidate] = useState(1);
    const [birthDay, setBirthDay] = useState('');
    const [birthDayValidate, setBirthDayValidate] = useState(1);
    const [disabledButton, setDisabledButton] = useState(false);
    const email = params['route']['params']['params']['email'];
    const phoneNumber = params['route']['params']['params']['phoneNumber'];
    const modalizeRef = useRef<Modalize>(null);

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
            modalizeRef.current?.open()
        } else {       
            navigation.navigate('Andress', {
                params: {
                    email: email,
                    phoneNumber: phoneNumber,
                    cpf: cpf,
                    fullName: fullName,
                    birthDay: birthDay,
                }
            })
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
                <Modalize
                    ref={modalizeRef}
                    withHandle={false}
                    adjustToContentHeight={true}
                >
                    <ModalArea>
                        <ModalTitle>
                            CPF já cadastrado
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
                            isLoading={loading} 
                            title='Tentar novamente'
                            onPressIn={() => modalizeRef.current?.close()}
                            disabled={false}
                        />
                    </ModalArea>
                </Modalize>
            </Container>
    );
}