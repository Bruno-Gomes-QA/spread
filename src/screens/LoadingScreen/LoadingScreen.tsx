import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, View } from './style'
import { useAuth } from "../../contexts/Auth";
import LottieView from 'lottie-react-native';
import { UserHaveCode } from "../../services/firestoreService";

export function LoadingScreen(){
    
    const {authData} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(async () => {
            if (authData) {
                await UserHaveCode(authData.user['email']).then((hasCode) => {
                    console.log(hasCode)
                    {hasCode? (
                        navigation.reset({
                            routes:[{name:'Home'}]
                        })
                    ):(
                        navigation.reset({
                            routes:[{name:'CodeSlide'}]
                        })
                    )}
                })

            } else { 
                navigation.reset({
                    routes:[{name:'Welcome'}]
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