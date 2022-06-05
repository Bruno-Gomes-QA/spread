import styled from 'styled-components/native'; 
import { Dimensions } from 'react-native';

const {width} = Dimensions.get('window') 

export const Container = styled.SafeAreaView`
    background-color: #FD8033;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex: 1;
`

export const ButtonSlide = styled.TouchableOpacity`
    
`

export const ButtonArea = styled.View`
    width: 90%;
    padding-bottom: 15%;
    align-items: center;
    align-content: center;
    justify-content: center;
`

export const IconArea = styled.View`
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-top: 5%;
`

export const TitleText = styled.Text`
    font-size: 25px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 900;
`

export const SubTitleText = styled.Text`
    font-size: 15px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
`

export const PriceText = styled.Text`
    font-size: 40px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
    text-align: left;
    font-weight: bold;
    color: #FD8033;
`

export const ModalArea = styled.View`
    width: 100%;
    height: 100%;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;
