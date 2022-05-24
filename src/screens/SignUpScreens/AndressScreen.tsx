import { useNavigation } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg";
import Button from '../../components/Button';
import ButtonWhite from '../../components/ButtonWhite';
import InputButton from '../../components/InputButton';
import LottieView from 'lottie-react-native';
import { FormatarCep } from '../../components/Checks';
import { Modalize } from 'react-native-modalize';
import {
    Container,
    InputArea,
    HeaderArea,
    ModalArea,
    ModalTitle,
    ModalText,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function AndressScreen(params){
    
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [cep, setCep] = useState('');
    const [cepValidate, setCepValidate] = useState(1);
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [error, setError] = useState(true)
    const email = params['route']['params']['params']['email'];
    const phoneNumber = params['route']['params']['params']['phoneNumber'];
    const cpf = params['route']['params']['params']['cpf'];
    const fullName = params['route']['params']['params']['fullName'];
    const birthDay = params['route']['params']['params']['birthDay'];
    const [editable, setEditable] = useState(true);
    const modalizeRef = useRef<Modalize>(null);

    useEffect(() => {
        
        setCep(FormatarCep(cep))

        if(cep.length === 9){
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((json) => {
                    if (json['erro']){
                        setError(true)
                    } else {                   
                        setError(false)
                        setStreet(json['logradouro'])
                        setDistrict(json['bairro'])
                        setCity(json['localidade'])
                        setState(json['uf'])
                    }
                })
        }

        if (cep === '') { 
            setCepValidate(1)
        } else if (cep.length < 9) {
            setCepValidate(2)
        }  else if (error) {
            setCepValidate(2)
        } else if (!error) {
            setCepValidate(3)
            setEditable(false)
            modalizeRef.current?.open()
            setTimeout(() => {
                setEditable(true)
            }, 3000);
        }

    }, [cep, error, cepValidate])

    function handleButtonPressContinue(){
        setIsLoading(true)
        navigation.navigate('Password', {
            params: {
                email: email,
                phoneNumber: phoneNumber,
                cpf: cpf,
                fullName: fullName,
                birthDay: birthDay,
                cep: cep,
                state: state,
                city: city,
                district: district,
                street: street,
            }
        })
        setIsLoading(false)
    }

    return(
        <Container>
            <HeaderArea></HeaderArea>
            <SpreadLogo width="100%" height={120} ></SpreadLogo>
            <InputArea>
                <InputButton
                    Icon='enviromento'
                    placeholder='Informe seu CEP'
                    value={cep} 
                    onChangeText={setCep}
                    password={false}
                    editable={editable}
                    maxLength={9}
                    keyboardType={"numeric"}
                    validate={cepValidate}
                    autoCapitalize={'none'}
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
                    <ModalArea>
                        <ModalTitle>
                            Este é seu endereço?
                        </ModalTitle>
                            <LottieView
                                source={require('../../../assets/house.json')}
                                autoPlay={true}
                                loop={true}
                                style={{height: 120, width: 120}}
                            />
                        <ModalText>
                            {street + ', ' + district + ', ' + city + ', ' + state }
                        </ModalText>
                        <ButtonWhite
                            title={"Confirmar endereço"}
                            onPressIn={handleButtonPressContinue}
                            isLoading={loading}
                            disabled={false}
                        ></ButtonWhite>
                        <Button 
                            isLoading={false} 
                            title='Tentar novamente'
                            onPressIn={() => modalizeRef.current?.close()}
                            disabled={false}
                        />
                    </ModalArea>
                </Modalize>
        </Container>
    );
}