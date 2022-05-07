import { 
    Container,
    Header,
    ButtonArea,
    ButtonRow,
    SaldoArea,
    SaldoText,
    SaldoTextTitle 
} from './style';
import ButtonHome from '../../components/ButtonHome';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import ConfigButton from '../../components/ButtonHomeHeader';
import SpreadLogo from "../../../assets/spreadnamewhite.svg";

export function HomeScreen(){

    const navigation = useNavigation();

    function handleButtonPressSettings(){
        navigation.navigate('Settings')
    }

    return(
        <Container>
            <Header>
                <ConfigButton
                    onPressIn={handleButtonPressSettings}
                    disabled={false}
                    icon={'user'}
                >

                </ConfigButton>
                <SpreadLogo width="60%" height={80}/>
                <ConfigButton
                    onPressIn={handleButtonPressSettings}
                    disabled={false}
                    icon={'options'}
                >

                </ConfigButton>
            </Header>
            <ButtonArea>
                <SaldoArea>
                    <SaldoTextTitle>
                        Saldo
                    </SaldoTextTitle>
                    <SaldoText>
                        R$ 65,00
                    </SaldoText>
                </SaldoArea>
                <ButtonRow>
                    <ButtonHome
                        title='Pix' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'API'}
                    >

                    </ButtonHome>
                    <ButtonHome
                        title='Indicações' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'barschart'}
                    >
                    </ButtonHome>
                    <ButtonHome
                        title='Gift Card' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'gift'}
                    >
                    </ButtonHome>
                </ButtonRow>
                <ButtonRow>
                    <ButtonHome
                        title='Dicas' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'book'}
                    >

                    </ButtonHome>
                    <ButtonHome
                        title='Renovação' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'hourglass'}
                    >
                    </ButtonHome>
                    <ButtonHome
                        title='Shop' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'shoppingcart'}
                    >
                    </ButtonHome>
                </ButtonRow>
            </ButtonArea>
            
        </Container>
    );
}