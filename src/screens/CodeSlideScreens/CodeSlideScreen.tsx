import { useEffect, useState, useRef } from "react";
import IniciandoSVG from "../../../assets/iniciando.svg";
import AvancadoSVG from "../../../assets/avancado.svg";
import InfluenciadorSVG from "../../../assets/influenciador.svg";
import { useNavigation } from "@react-navigation/native";
import { createPayment } from "../../services/mercadopagoService";
import { useAuth } from "../../contexts/Auth";
import { Modalize } from 'react-native-modalize';
import { getUserInfo, ValideCode } from "../../services/firestoreService";
import InputButton from "../../components/InputButton";
import { FlatList, View, Dimensions, ImageBackground } from "react-native";
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
]

export function CodeSlideScreen(){

    const modalizeRef = useRef<Modalize>(null);
    const navigation = useNavigation()
    const { checkCurrentUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState('')
    const [validateCode, setValidateCode] = useState(1)
    const [buttonContinueDisabled, setButtonContinueDisabled] = useState(true)
    const [price, setPrice] = useState(0)

    useEffect (() => {
        getValidateCode()
    },[code])

    async function getValidateCode () {
        if (code.length > 5) {
            await ValideCode(code).then((valideCode) => {
                if (valideCode) {
                    setValidateCode(3) 
                    setButtonContinueDisabled(false)
                } else {
                    setValidateCode(2)
                    setButtonContinueDisabled(true)
                }
            })
        } else if (code.length > 0) {
            setButtonContinueDisabled(true)
            setValidateCode(2)
        }  else {
            setTimeout(() => {
                setButtonContinueDisabled(false)
            }, 3000);
            setValidateCode(1)
        }
    }

    async function getUrlPayment(discont){
        let url
        let final_price
        if (discont) {
            final_price = (price / 100) * 90
        } else {
            final_price = price
        }
        const user = await checkCurrentUser()
        await getUserInfo(user['email']).then(async(userData) => {
            await createPayment(userData, final_price).then((json) => {
                url = json.ml_response.response.sandbox_init_point
            })
        })
        return url
    }
    
    function handlePressCode(value) {
        setPrice(value)
        setTimeout(() => {
            setButtonContinueDisabled(false)
        }, 3000);
        modalizeRef.current?.open()
    }

    async function handlePressContinue() {
        setLoading(true)
        let discont = false
        if (validateCode === 3) {
            discont = true
        } 
        getUrlPayment(discont).then((url) => {
            setLoading(false)
            navigation.navigate('MercadoPago', {
                params: {uri: url}
            })
        })


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
                    renderItem={({item, index}) => {
                        let influencer = index == 2
                        return (
                            <ButtonSlide
                                onPress={() => handlePressCode(item.value)}
                                disabled={influencer}
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
                            value={code} 
                            onChangeText={setCode}
                            password={false}
                            maxLength={6}
                            keyboardType={"default"}
                            validate={validateCode}
                            autoCapitalize={'characters'}
                        />
                        <SubTitleText>• Caso alguém tenha te indicado o Spread informe o código acima e receba 10% de desconto </SubTitleText>
                        <SubTitleText>• Se ninguém indicou o Spread fique tranquilo, é possível informar um código dentro do app e receber cashback de 10%</SubTitleText>
                        <IconArea>
                        <Button 
                            isLoading={loading} 
                            title='Continuar' 
                            onPressIn={() => handlePressContinue()}
                            disabled={buttonContinueDisabled}
                            />
                        </IconArea>
                    </ModalArea>
                </Modalize>
            </ImageBackground>
    )
}

