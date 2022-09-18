import { useNavigation } from '@react-navigation/native';
import { Container, TitleText, Area } from './style';
import LottieView from 'lottie-react-native';
import { useAuth } from '../../contexts/Auth';
import { useEffect } from 'react';
import { setNewCodeData } from '../../services/firestoreService';

export function PaymentStatusScreen(params){

    const status = params['route']['params']['status'];
    const navigation = useNavigation();
    const {authData} = useAuth();

    useEffect(() => {
        setNewCodeData(authData.user['email'])
    },[])

    return (
        <Container>
            <Area>
                <LottieView
                    source={require('../../../assets/confirm_payment.json')}
                    autoPlay={true}
                    loop={false}
                />
            </Area>
            <Area>
                <TitleText> Parabéns seu pagamento foi aprovado </TitleText>
            </Area> 
        </Container>

    )
}