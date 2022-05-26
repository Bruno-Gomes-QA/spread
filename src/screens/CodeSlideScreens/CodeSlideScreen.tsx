import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createPayment } from "../../services/mercadopagoService";
import { useAuth } from "../../contexts/Auth";
import { getUserInfo } from "../../services/firestoreService";
import { Alert } from "react-native";
import {
    Container,
    InitCodeView, 
} from './style';

export function CodeSlideScreen(){

    const navigation = useNavigation()
    const { checkCurrentUser } = useAuth()
    const [uri, setUri] = useState('')
    useEffect(() => {
        navigation.navigate('MercadoPago', {
            params: {
                uri: uri
            }
        })
    },[uri])
    
    async function getUrlPayment(){
        const user = await checkCurrentUser()
        if (user) {
            let userData = await getUserInfo(user['email'])
            await createPayment(userData).then((json) => {
                setUri(json.ml_response.response.sandbox_init_point)
            })
        } else {
            Alert.alert("error")
        }

    }

    return (
        <Container>
            <InitCodeView
                onPressIn={() => getUrlPayment()}
            >
            </InitCodeView>
        </Container>
    )
}