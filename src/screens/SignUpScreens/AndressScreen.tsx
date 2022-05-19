import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import InputButton from '../../components/InputButton';
import { FormatarCep } from '../../components/Checks';
import { setCepData } from '../../services/firestoreService';
import {
    Container,
    InputArea,
    HeaderArea,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function AndressScreen(email){
    
    const navigation = useNavigation();
    const [cep, setCep] = useState('');
    const [cepValidate, setCepValidate] = useState(1);
    const [street, setStreet] = useState('');
    const [district, setDistrict] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [disabledButton, setDisabledButton] = useState(false);
    const[error, setError] = useState(true)
    const userEmail = email['route']['params']['email'];

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
        }

        const allFilledCorrect = cepValidate === 3 && houseNumber.length > 0

        if (allFilledCorrect) {
            setDisabledButton(false)          
        } else {
            setDisabledButton(true)
        }


    }, [cep, houseNumber, error, cepValidate])

    function handleButtonPressContinue(){
        setCepData(userEmail, cep, street, district, city, state, houseNumber, complement)
            .then((doc) => navigation.navigate('Password', {email: userEmail}))
            .catch((error) => Alert.alert('Erro desconhecido', 'Tente novamente mais tarde'));
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
                    maxLength={9}
                    keyboardType={"numeric"}
                    validate={cepValidate}
                    autoCapitalize={'none'}
                />
                <InputButton
                    Icon=''
                    placeholder='Informe seu Endereço'
                    value={street} 
                    onChangeText={setStreet}
                    password={false}
                    maxLength={100}
                    keyboardType={"default"}
                    validate={1}
                    autoCapitalize={'none'}
                />
                <InputButton
                    Icon=''
                    placeholder='Informe seu Número'
                    value={houseNumber} 
                    onChangeText={setHouseNumber}
                    password={false}
                    maxLength={6}
                    keyboardType={"numeric"}
                    validate={1}
                    autoCapitalize={'none'}
                />
                <InputButton
                    Icon=''
                    placeholder='Complemento (Opcional)'
                    value={complement} 
                    onChangeText={setComplement}
                    password={false}
                    maxLength={20}
                    keyboardType={"default"}
                    validate={1}
                    autoCapitalize={'none'}
                />
                <Button 
                    isLoading={false} 
                    title='Continue' 
                    onPressIn={handleButtonPressContinue}
                    disabled={disabledButton}
                />
            </InputArea>
            <SignMessageButton onPressIn={() => navigation.navigate('SignIn')}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Entrar</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}