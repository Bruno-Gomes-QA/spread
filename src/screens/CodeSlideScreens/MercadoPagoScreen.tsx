import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export function MercadoPagoScreen(params){

    const uri = params['route']['params']['params']['uri'];
    const navigation = useNavigation();

    async function stateChange(state) {
        let url = state.url
        console.log(url)
        if (!url.includes('mercadopago')) {
            if (url.includes('status=approved')) {
                navigation.reset({
                    routes:[{name:'PaymentStatus', params: {status: 'Aprovado'}}]
                })
            } else {
                navigation.navigate('CodeSlide')
            } 
        }
    }

    return (
        <WebView 
            style={{flex: 1, marginTop: 30}}
            source={{ uri: uri }}
            startInLoadingState={true}
            onNavigationStateChange={state => stateChange(state)}
        />
    )
}