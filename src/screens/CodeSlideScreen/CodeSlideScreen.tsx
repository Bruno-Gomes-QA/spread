import { useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonIcon from "../../components/ButtonIcon";
import ButtonWhite from "../../components/ButtonWhite";
import { Modalize } from "react-native-modalize";
import { FlatList } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
import {
    Container,
    ButtonViewArea, 
    InitCodeView, 
    ExpertCodeView,
    InfluencerCodeView,
    ButtonView, 
    TitleText, 
    SubTitleText 
} from './style';
import { createPayment } from "../../services/mercadopagoService";

export function CodeSlideScreen(){

    const DATA = [
        {
          "key": "1",
          "title": "Bem-vindo ao Spread",
          "description": "Onde é possível gerar renda extra de forma simples e prática.",
          "animation": require('../../../assets/welcome.json')
        },
        {
            "key": "2",
            "title": "O início de tudo",
            "description": "Para começar a indicar e ser indicado, é necessário completar seu cadastro nas próximas etapas.",
            "animation": require('../../../assets/signup.json'),
        },
        {
            "key": "3",
            "title": "O próximo passo",
            "description": "Adquira um código com a melhor opção para você e começe a ganhar agora mesmo.",
            "animation": require('../../../assets/buyspreadcode.json'),
        }
      ]

    const navigation = useNavigation();
    const [initSignUp, setInitSignUp] = useState(false);
    const [card, setCard] = useState(0);
    const [lastCard, setLastCard] = useState(false);
    const modalizeRef = useRef<Modalize>(null);

    function nextCard () {
        if (card === 5) {
            navigation.navigate('TermsAndConditions')
            setTimeout(() => {
                setCard(0)
                setLastCard(false)
            }, 1000);
        } else if(card === 4) {
            setCard(card+1)
            setLastCard(true)
        } else {
            setCard(card+1)
        }
    }

    function prevCard () {
        if (card === 0) {
            setInitSignUp(false)
        } else {
            setCard(card-1)
        }
    }
    return (
        <Container>
            <InitCodeView
                onPressIn={createPayment('Teste', 100)}
            >
            </InitCodeView>
            <Modalize
                ref={modalizeRef}
                withHandle={false}
                adjustToContentHeight={true}
            >
                <ButtonView>
                    <ButtonWhite
                        title={"Fechar"}
                        onPressIn={() => modalizeRef.current?.close()}
                        isLoading={false}
                        disabled={false}
                    ></ButtonWhite>
                    <ButtonIcon
                            title={"Selecionar"}
                            onPressIn={() => console.log('Selecionando')}
                            isLoading={false}
                            icon={'rocket'}
                            disabled={false}
                        >
                    </ButtonIcon>
                </ButtonView>
            </Modalize>
        </Container>
    )
}