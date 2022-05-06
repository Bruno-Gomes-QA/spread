import { 
    Container,
    ButtonArea,
    ButtonRow,
    PaddingButtonRow,
    SaldoArea,
    SaldoText,
    SaldoTextTitle 
} from './style';
import ButtonHome from '../../components/ButtonHome';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export function HomeScreen(){

    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);

    function handleButtonPressSettings(){

        setIsLoading(true);
        console.log('Pressionando');
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        navigation.navigate('Settings')
    }

    return(
        <Container>
            <SaldoArea>
                <SaldoTextTitle>
                    Saldo
                </SaldoTextTitle>
                <SaldoText>
                    R$ 65,00
                </SaldoText>
            </SaldoArea>
            <ButtonArea>
                <PaddingButtonRow></PaddingButtonRow>
                <ButtonRow>
                    <ButtonHome
                        isLoading={loading}
                        title='Pix' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'API'}
                    >

                    </ButtonHome>
                    <ButtonHome
                        isLoading={loading}
                        title='Indicações' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'barschart'}
                    >
                    </ButtonHome>
                    <ButtonHome
                        isLoading={loading}
                        title='Gift Card' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'gift'}
                    >
                    </ButtonHome>
                </ButtonRow>
                <ButtonRow>
                    <ButtonHome
                        isLoading={loading}
                        title='Dicas' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'book'}
                    >

                    </ButtonHome>
                    <ButtonHome
                        isLoading={loading}
                        title='Renovação' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'hourglass'}
                    >
                    </ButtonHome>
                    <ButtonHome
                        isLoading={loading}
                        title='Shop' 
                        onPressIn={handleButtonPressSettings}
                        disabled={false}
                        icon={'shoppingcart'}
                    >
                    </ButtonHome>
                </ButtonRow>
                <PaddingButtonRow></PaddingButtonRow>
            </ButtonArea>
            
        </Container>
    );
}