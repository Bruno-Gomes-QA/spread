import { WebView } from 'react-native-webview';

export function MercadoPagoScreen(params){

    const uri = params['route']['params']['params']['uri'];
    return (
        <WebView 
            style={{flex: 1, marginTop: 30}}
            source={{ uri: uri }}
        />
    )
}