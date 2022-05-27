import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native'

export function PaymentStatusScreen(params){

    const status = params['route']['params']['status'];
    const navigation = useNavigation();

    return (
        <Text> Status do Pagamento: {status}</Text>
    )
}