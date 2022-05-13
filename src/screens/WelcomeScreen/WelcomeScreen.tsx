import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, View, ButtonView, TitleText, SubTitleText } from './style';
import { useAuth } from "../../contexts/Auth";
import ButtonIcon from "../../components/ButtonIcon";
import LottieView from 'lottie-react-native';

export function WelcomeScreen(){

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
        },
        {
            "key": "4",
            "title": "Importante Lembrar",
            "description": "Seu código possui uma data de validade dessa maneira sendo necessário renovar periodicamente.",
            "animation": require('../../../assets/expiratetiming.json'),
        },
        {
            "key": "4",
            "title": "Spread!",
            "description": "Agora comece a espalhar seu código para amigos e familiares e ganhe recompensas para cada novo usuário que utilizar seu código.",
            "animation": require('../../../assets/spreading.json'),
        },
      ]
    const {checkCurrentUser} = useAuth();
    const navigation = useNavigation();
    const [card, setCard] = useState(0)

    useEffect(() => {

    }, []);

    function nextCard () {
        if (card === 4) {
            navigation.navigate('ConfirmAccountScreen')
            setTimeout(() => {
                setCard(0)
            }, 1000);
        } else {
            setCard(card+1)
        }

        console.log(card)
    }

    return (
            <Container>
                <TitleText>
                    {DATA[card].title}
                </TitleText>
                <SubTitleText>
                    {DATA[card].description}
                </SubTitleText>
                <View>
                    <LottieView
                        source={DATA[card].animation}
                        autoPlay={true}
                        loop={true}
                    />
                </View>
                <ButtonView>
                    <ButtonIcon
                            title={"Próximo"}
                            onPressIn={nextCard}
                            isLoading={false}
                            icon={'action-redo'}
                            disabled={false}
                        >
                    </ButtonIcon>
                </ButtonView>
            </Container>
            )

}