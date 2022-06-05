import { useEffect, useState, useRef } from "react";
import IniciandoSVG from "../../../assets/iniciando.svg";
import AvancadoSVG from "../../../assets/avancado.svg";
import InfluenciadorSVG from "../../../assets/influenciador.svg";
import { useNavigation } from "@react-navigation/native";
import { createPayment } from "../../services/mercadopagoService";
import { useAuth } from "../../contexts/Auth";
import { Modalize } from 'react-native-modalize';
import { getUserInfo } from "../../services/firestoreService";
import InputButton from "../../components/InputButton";
import { FlatList, View, Dimensions, Alert, ImageBackground } from "react-native";
import {
    TitleText,
    IconArea,
    ButtonSlide,
    SubTitleText,
    PriceText,
    ModalArea
} from './style';
import Button from "../../components/Button";

const {width} = Dimensions.get('window') 


const data =  [{
    key: '1',
    name: "Código Básico",
    value: 65.90,
    price: 'R$ 65,90',
    icon: <IniciandoSVG width="60%" height={width * 0.5}/>,
    text: '• Ganhe R$ 29,90 por indicação\n\n• Válido por um mês\n\n• Renove por apenas R$ 9,90\n\n• Comece a ganhar agora!'
  },
  {
    key: '2',
    name: "Avançado",
    value: 119.90,
    price: 'R$ 119,90',
    icon: <AvancadoSVG width="60%" height={width * 0.5}/>,
    text: '• Ganhe R$ 35,90 por indicação\n\n• Válido por três meses\n\n• Renove por apenas R$ 9,90\n\n• Comece a ganhar agora!'
  },
  {
    key: '3',
    name: "Influenciador",
    value: '∞',
    price: 'R$ ---',
    icon: <InfluenciadorSVG width="60%" height={width * 0.5}/>,
    text: '• Caso possuir mais de 50.000 seguidores em sua rede social principal escolha esse código\n\n• Receba benefícios exclusivos \n\n• Possíveis parcerias'
  },
]

export function CodeSlideScreen(){

    const modalizeRef = useRef<Modalize>(null);
    const [page, setPage] = useState(0)
    const navigation = useNavigation()
    const { checkCurrentUser } = useAuth()
    const [uri, setUri] = useState('')
    const [loading, setLoading] = useState(true)
    const [confirmationCode, setConfirmationCode] = useState('')
    const [valideConfirmationCode, setValideConfirmationCode] = useState(1)
    
    useEffect(() => {
        getUrlPayment()
    },[])

    async function getUrlPayment(){
        const user = await checkCurrentUser()
        if (user) {
            let userData = await getUserInfo(user['email'])
            await createPayment(userData, 65.90).then((json) => {
                setUri(json.ml_response.response.sandbox_init_point)
                setTimeout(() => {
                    setLoading(false)
                }, 1000);
            })
        } else {
            Alert.alert("error")
        }
    }

    return (
            <ImageBackground
                source={require('../../../assets/background_code.png')}
                resizeMode="cover"
                style={{ flex: 1, justifyContent: 'center', alignContent: 'center', alignItems: 'center'}}
            >
                <FlatList
                    style={{marginTop: width * 0.3}}
                    data={data}
                    keyExtractor={item => item.key}
                    horizontal
                    snapToOffsets={[width * 0.8]}
                    snapToAlignment={'start'}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    decelerationRate='fast'
                    renderItem={({item, index}) =>{ 
                        return (
                            <ButtonSlide
                                onPress={() => modalizeRef.current?.open()}
                            >
                                <View style={{
                                    backgroundColor: '#FFF',
                                    height: width * 1.5,
                                    width: width * 0.8,
                                    marginHorizontal: 10,
                                    borderRadius: 20,
                                    alignContent: 'center',
                                    alignItems: 'center'
                                    }}>
                                    <IconArea>
                                        {item.icon}
                                    </IconArea>
                                    <TitleText> {item.name} </TitleText>
                                    <PriceText>{item.price}</PriceText>
                                    <SubTitleText>{item.text}</SubTitleText>
                                </View>
                            </ButtonSlide>
                        )
                    }}
                ></FlatList>
                <Modalize
                    ref={modalizeRef}
                    withHandle={false}
                    adjustToContentHeight={true}
                >
                    <ModalArea>
                        <TitleText>Indicação</TitleText>
                        <InputButton
                            Icon='key'
                            placeholder='Informe o código'
                            value={confirmationCode} 
                            onChangeText={setConfirmationCode}
                            password={false}
                            maxLength={6}
                            keyboardType={"phone-pad"}
                            validate={valideConfirmationCode}
                            autoCapitalize={'none'}
                        />
                        <SubTitleText>• Caso alguém tenha te indicado o Spread informe o código acima e receba 10% de desconto </SubTitleText>
                        <IconArea>

                        <Button 
                            isLoading={loading} 
                            title='Continuar' 
                            onPressIn={() => console.log('XPTO')}
                            disabled={false}
                            />
                        </IconArea>
                    </ModalArea>
                </Modalize>
            </ImageBackground>
    )
}

