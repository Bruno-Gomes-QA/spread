import { useNavigation } from '@react-navigation/native';
import ConfigButton from '../../components/ButtonHomeHeader';
import SpreadLogo from "../../../assets/spreadnamewhite.svg";
import { StatusBar } from 'react-native';
import { TabBarOptions } from '../../components/TabBarOptions';
import { 
    Container,
    Header,
    ButtonArea,
    SaldoArea,
    SaldoText,
    SaldoTextTitle,
} from './style';

export function HomeScreen(){

    const navigation = useNavigation();

    function handleButtonPressSettings(){
        navigation.navigate('Settings')
    }

    return(
        <Container>
            <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'}/>
            <Header>
                <ConfigButton
                    onPressIn={handleButtonPressSettings}
                    disabled={false}
                    icon={'user'}
                >
                </ConfigButton>
                <SpreadLogo width="60%" height={120}/>
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
                <TabBarOptions>
                </TabBarOptions>
            </ButtonArea>
            
        </Container>
    );
}