import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    background-color: #FFF;
    flex: 1;
    justify-content: center;
    align-items: center;
`

export const InputArea = styled.View`
    padding: 10px;
    width: 100%;
    justify-content: center;
    align-items: center;
`
export const HeaderArea = styled.View`
    padding: 10px
    width: 100%
    justify-content: center;
    align-items: center;
`

export const LogoArea = styled.View`
    padding: 10px
    width: 100%
    justify-content: center;
    align-items: center;
`

export const SignMessageButton = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;
export const SignMessageButtonText =styled.Text`
    font-size: 12px;
    color: #000;
`;
export const SignMessageButtonTextBold =styled.Text`
    font-size: 12px;
    color: #000;
    font-weight: bold;
    margin-left: 5px;
`;