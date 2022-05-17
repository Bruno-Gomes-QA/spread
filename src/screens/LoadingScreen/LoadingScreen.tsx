import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, View, LoadingText } from './style';
import { useAuth } from "../../contexts/Auth";
import LottieView from 'lottie-react-native';

export function LoadingScreen(extraData){
    const {authData} = useAuth();
    const navigation = useNavigation();
    const [retry, setRetry] = useState(false)

    useEffect(() => {
        if (extraData['extraData']) {
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
            
        } else {
            setRetry(!retry)}

    }, [retry]);

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