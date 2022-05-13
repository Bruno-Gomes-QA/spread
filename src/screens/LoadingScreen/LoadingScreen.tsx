import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, View } from './style';
import { useAuth } from "../../contexts/Auth";
import LottieView from 'lottie-react-native';

export function LoadingScreen(){
    const {authData} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            {authData ? console.log('Logado') : navigation.navigate('SignInit')}
        }, 3000);

    }, []);

    return (
        <Container>
            <View>
                <LottieView
                    source={require('../../../assets/loading.json')}
                    autoPlay={true}
                    loop={true}
                />
            </View>

        </Container>
    );
}