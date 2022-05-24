import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import Button from '../../components/Button';
import CheckBox  from '../../components/CheckBox'
import { useAuth } from '../../contexts/Auth';
import {
    Container,
    HeaderArea,
    TermsConditionsArea,
    TermsConditionsTitle,
    SignMessageButton,
    SignMessageButtonText,
    SignMessageButtonTextBold,
} from './style';

export function TermsAndConditionsScreen(){
    
    const {signUp} = useAuth();
    const navigation = useNavigation();
    const [disabledButton, setDisabledButton] = useState(false);
    const [isTermsSelected, setTermsSelection] = useState(false);
    const [isConditionsSelected, setConditionsSelection] = useState(false);

    useEffect(() => {

        if (isTermsSelected && isConditionsSelected) {
            setDisabledButton(false)  
        } else {
            setDisabledButton(true)
        }

    }, [isConditionsSelected, isTermsSelected])

    function handleButtonPressReturnSignIn(){
        navigation.navigate('SignIn');
    }
    
    return(
        <Container>
            <HeaderArea></HeaderArea>
            <SpreadLogo width="100%" height={120} ></SpreadLogo>
            <TermsConditionsArea>
                <TermsConditionsTitle>
                    Contrato de Usuário
                </TermsConditionsTitle>
                <CheckBox 
                    onPressIn={() => setConditionsSelection(!isConditionsSelected)}
                    Check={isConditionsSelected}
                    Title={'Declaro que li e aceito os termos'}
                ></CheckBox>
            </TermsConditionsArea>
            <TermsConditionsArea>
                <TermsConditionsTitle>
                        Política de Privacidade
                    </TermsConditionsTitle>
                    <CheckBox 
                        onPressIn={() => setTermsSelection(!isTermsSelected)}
                        Check={isTermsSelected}
                        Title={'Declaro que li e aceito os termos'}
                    ></CheckBox>
            </TermsConditionsArea>
            <Button 
                isLoading={false} 
                title='Continuar' 
                onPressIn={() => navigation.navigate('EmailandNumber')}
                disabled={disabledButton}
            />
            <SignMessageButton onPressIn={handleButtonPressReturnSignIn}>
                <SignMessageButtonText>Já possui uma conta?</SignMessageButtonText>
                <SignMessageButtonTextBold>Entrar</SignMessageButtonTextBold>
            </SignMessageButton>
        </Container>
    );
}