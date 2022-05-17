import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ButtonWhite from "../../components/ButtonWhite";
import ButtonIcon from "../../components/ButtonIcon";
import LottieView from 'lottie-react-native';
import SpreadLogo from "../../../assets/spreadname.svg";
import {
    Container,
    ButtonArea,
    ButtonViewArea, 
    ContainerInit, 
    View, 
    InitView, 
    ButtonAreaClient, 
    LogoArea, 
    ButtonView, 
    ButtonsArea, 
    TitleText, 
    SubTitleText 
} from './style';

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
            "description": "Agora comece a espalhar para amigos e familiares e ganhe recompensas para cada novo usuário que utilizar seu código.",
            "animation": require('../../../assets/spreading.json'),
        },
        {
            "key": "5",
            "title": "Transfira seus ganhos!",
            "description": "Você pode realizar pix para seus amigos ou contas de sua titularidade de forma rápida e segura",
            "animation": require('../../../assets/pixwithdraw.json'),
        },
      ]

    const navigation = useNavigation();
    const [initSignUp, setInitSignUp] = useState(false);
    const [card, setCard] = useState(0);
    const [lastCard, setLastCard] = useState(false);

    function nextCard () {
        if (card === 5) {
            navigation.navigate('EmailandNumber')
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

    if (initSignUp) {
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
                {lastCard ? 
                    <ButtonView>
                        <ButtonIcon
                                title={"Torna-se Spread"}
                                onPressIn={nextCard}
                                isLoading={false}
                                icon={'rocket'}
                                disabled={false}
                            >
                        </ButtonIcon>
                    </ButtonView>
                   
                :
                    <ButtonView>
                        <ButtonViewArea>
                            <ButtonIcon
                                    title={"Anterior"}
                                    onPressIn={prevCard}
                                    isLoading={false}
                                    icon={'arrow-left-circle'}
                                    disabled={false}
                                >
                            </ButtonIcon>
                        </ButtonViewArea>
                        <ButtonViewArea>
                            <ButtonIcon
                                    title={"Próximo"}
                                    onPressIn={nextCard}
                                    isLoading={false}
                                    icon={'arrow-right-circle'}
                                    disabled={false}
                                >
                            </ButtonIcon>
                        </ButtonViewArea>
                    </ButtonView>
                }
            </Container>
        )
    } else {
        return (
            <ContainerInit>
                <LogoArea>
                    <SpreadLogo width="100%" height={120} ></SpreadLogo>    
                </LogoArea>
                <InitView>
                    <LottieView
                            source={require('../../../assets/networking.json')}
                            autoPlay={true}
                            loop={true}
                    />
                </InitView>
                <ButtonsArea>
                    <ButtonAreaClient>
                        <ButtonWhite
                            title={"Já sou Cliente"}
                            onPressIn={() => navigation.navigate('SignIn')}
                            isLoading={false}
                            disabled={true}
                        >
                        </ButtonWhite>
                    </ButtonAreaClient>
                    <ButtonArea>
                        <ButtonWhite
                            title={"Fazer Cadastro"}
                            onPressIn={() => setInitSignUp(true)}
                            isLoading={false}
                            disabled={false}
                        >
                        </ButtonWhite>
                    </ButtonArea>
                    <ButtonArea></ButtonArea>
                    <ButtonArea></ButtonArea>
                </ButtonsArea>
            </ContainerInit>
        )
    }


}