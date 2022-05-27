import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Button from "../../components/Button";
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
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
        getUrlPayment()
    },[])

    async function getUrlPayment(){
        const user = await checkCurrentUser()
        if (user) {
            let userData = await getUserInfo(user['email'])
            await createPayment(userData).then((json) => {
                setUri(json.ml_response.response.sandbox_init_point)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
        } else {
            Alert.alert("error")
        }
    }

    return (
        <Container>
            <Button 
                isLoading={loading} 
                title='Comprar Código' 
                onPressIn={() => navigation.navigate('MercadoPago', {params: {uri: uri}})}
                disabled={false}
            />
        </Container>
    )
}