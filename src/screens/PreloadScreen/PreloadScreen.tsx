import { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import SpreadLogo from "../../../assets/spreadname.svg"
import { Container } from './style';
import { useAuth } from "../../contexts/Auth";

export function PreloadScreen(){
    const {checkCurrentUser} = useAuth();
    const {authData} = useAuth();
    const navigation = useNavigation();

    useEffect(() => {
        const user = checkCurrentUser;
        setTimeout(() => {
            {authData ? navigation.navigate('Home') : navigation.navigate('SignInit')}
        }, 3000);

    }, []);

    return (
        <Container>
            <SpreadLogo width="100%" height={120}/>
            <ActivityIndicator size='large' color='#000'/>
        </Container>
    );
}