import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, View, LoadingText } from './style'
import { useAuth } from "../../contexts/Auth";
import LottieView from 'lottie-react-native';

export function WelcomeLoadingScreen(){
    const {authData} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(() => {
            {authData ?
                navigation.reset({
                    routes:[{name:'Home'}]
                })
            : 
                navigation.reset({
                    routes:[{name:'WelcomeScreen'}]
                })
            }
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