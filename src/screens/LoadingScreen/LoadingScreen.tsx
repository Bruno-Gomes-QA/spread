import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, View, LoadingText } from './style';
import { useAuth } from "../../contexts/Auth";
import LottieView from 'lottie-react-native';

export function LoadingScreen(){
    const {authData} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            {authData ? navigation.navigate('Home') : navigation.navigate('WelcomeScreen')}
        }, 3000);
    }, []);

    return (
        <Container>
            <View>
                <LottieView
                    source={require('../../../assets/loading_time.json')}
                    autoPlay={true}
                    loop={true}
                />
            </View>
        </Container>
    );
}