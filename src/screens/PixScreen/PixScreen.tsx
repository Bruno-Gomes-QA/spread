import SpreadLogo from "../../../assets/spreadname.svg"
import { Text } from "react-native";
import { Container } from './style';

export function PixScreen(){

    return (
        <Container>
            <SpreadLogo width="100%" height={120}/>
            <Text> Pix </Text>
        </Container>
    );
}