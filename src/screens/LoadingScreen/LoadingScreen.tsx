import { Container, View } from './style';
import LottieView from 'lottie-react-native';

export function LoadingScreen(){

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