import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import ConfigButton from '../../components/ButtonHomeHeader';
import SpreadLogo from "../../../assets/spreadnamewhite.svg";
import { Alert, StatusBar } from 'react-native';
import { TabBarOptions } from '../../components/TabBarOptions';
import { useAuth } from '../../contexts/Auth';
import { getUserInfo } from '../../services/firestoreService';
import { 
    Container,
    Header,
    ButtonArea,
    SaldoArea,
    SaldoText,
    SaldoTextTitle,
} from './style';

export function HomeScreen(){

    const [balance, setBalance] = useState(0);
    const [retry, setRetry] = useState(0);
    const { checkCurrentUser } = useAuth();
    const navigation = useNavigation();
    
    useEffect(() => {
        userData()
    },[retry])   

    async function userData() {
        const user = await checkCurrentUser()
        const userInfo = await getUserInfo(user['email'])
        if (userInfo) {
            setBalance(userInfo['balance'])
        } else {
            if (retry < 5){
                setRetry(+1)    
            } else {
                Alert.alert('Spread não está respondendo', 'Tente novamente mais tarde')
            }
        }
    }

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
                        R$ {balance}
                    </SaldoText>
                </SaldoArea>
                <TabBarOptions>
                </TabBarOptions>
            </ButtonArea>
            
        </Container>
    );
}