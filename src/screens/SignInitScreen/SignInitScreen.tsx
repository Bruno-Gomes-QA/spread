import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser'
import * as Google from 'expo-auth-session/providers/google';
import { useState, useEffect } from 'react';
import SpreadLogo from "../../../assets/spreadname.svg"
import ButtonIcon from '../../components/ButtonIcon';
import { useAuth } from '../../contexts/Auth';
import GoogleCredentials from '../../config/googleauthconfig'
import {
    Container,
    ButtonArea,
    LogoArea,
} from './style';

export function SignInitScreen(){

    const {signUpGoogle} = useAuth();
    const navigation = useNavigation();
    const [loading, setIsLoading] = useState(false);
    const [accessToken, setAccessToken] = useState('');
    const [userInfo, setUserInfo] = useState();

    WebBrowser.maybeCompleteAuthSession();

    const [request, response, promptAsync] = Google.useAuthRequest({
        androidClientId: GoogleCredentials.androidClientId,
        iosClientId: GoogleCredentials.iosClientId,
        expoClientId: GoogleCredentials.expoClientId,
      });
    
    useEffect(() => {
        if (accessToken) {
            getUserData()
        }
    },[accessToken])

    useEffect(() => {
        if (response?.type === 'success') {
            setAccessToken(response.authentication.accessToken);
        }
    },[response])

    async function getUserData() {
        let userInfoResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
          headers: { Authorization: `Bearer ${accessToken}`}
        });
        
        userInfoResponse.json().then(data => {
          setUserInfo(data);
        });
      }
    
      async function SignInWithGoogle() {
        getUserData()
        signUpGoogle(userInfo)
      }

    function handleButtonPressEmailAuth(){
        navigation.navigate('SignIn');
    }
    if(accessToken){ 
        return(
            <Container>
                <LogoArea>
                    <SpreadLogo width="100%" height={120} ></SpreadLogo>
                </LogoArea>
                <ButtonArea>
                    <ButtonIcon
                        title={"Ir para Home"}
                        onPressIn={SignInWithGoogle}
                        isLoading={loading}
                        icon={'social-google'}
                        disabled={false}
                    >

                    </ButtonIcon>
                </ButtonArea>
            </Container>
        )
    } else {
        return(
            <Container>
                <LogoArea>
                    <SpreadLogo width="100%" height={120} ></SpreadLogo>
                </LogoArea>
                <ButtonArea>
                    <ButtonIcon
                        title={"Entrar com Google"}
                        onPressIn={accessToken ? getUserData : () => { promptAsync() }}
                        isLoading={loading}
                        icon={'social-google'}
                        disabled={false}
                    >

                    </ButtonIcon>
                </ButtonArea>
                <ButtonArea>
                    <ButtonIcon
                        title={'Entrar com E-mail'}
                        onPressIn={handleButtonPressEmailAuth}
                        isLoading={loading}
                        icon={'envelope'}
                        disabled={false}
                        color=''
                    >

                    </ButtonIcon>
                </ButtonArea>
            </Container>
        )
    }
    
}