import { Container, ViewArea } from './style';
import {SlideCodeView} from "../../components/SlideCodeView";

export function CodeSlideScreen(){

    return (
        <Container>
            <ViewArea>
                <SlideCodeView/>
            </ViewArea>
        </Container>
    );
}