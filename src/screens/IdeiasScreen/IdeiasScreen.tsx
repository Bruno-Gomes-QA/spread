import SpreadLogo from "../../../assets/spreadname.svg"
import { Text } from "react-native";
import { Container } from './style';

export function IdeiasScreen(){

    return (
        <Container>
            <SpreadLogo width="100%" height={120}/>
            <Text> Ideias </Text>
        </Container>
    );
}