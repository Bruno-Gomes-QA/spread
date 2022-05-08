import { ActivityIndicator } from 'react-native';
import styled from "styled-components/native";
import { AntDesign } from '@expo/vector-icons';

export const TouchableOpacityButtonDisable = styled.TouchableOpacity`
    background-color: #FDFDFD;
    border-width: 0.5px;
    border-color: #FD8033;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 28%;
    height: 90%;
    border-radius: 5px;
    margin: 2%;
`;

export const TouchableOpacityButtonEnable = styled.TouchableOpacity`
    background-color: #FDFDFD;
    border-width: 0.5px;
    border-color: #FD8033;
    align-content: center;
    justify-content: center;
    align-items: center;
    width: 28%;
    height: 60%;
    border-radius: 5px;
    margin: 2%;
`;

export const View = styled.View`
    align-content: center;
    justify-content: center;
    align-items: center;
`

export const ButtonTitle = styled.Text`
    color: #737373;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    padding-top: 1%;
`;

export default ({title, onPressIn, disabled, icon}) => {
    if (disabled) {
        return (
            <TouchableOpacityButtonDisable
                disabled={disabled}
                onPressIn={onPressIn} 
            >
                <View>
                    <AntDesign name={icon} size={24} color="#FD8033" />
                    <ButtonTitle>{title}</ButtonTitle>
                </View>
            </TouchableOpacityButtonDisable>
        ) 
    } else {
        return (
            <TouchableOpacityButtonEnable
                disabled={disabled}
                onPressIn={onPressIn} 
            >
                <View>
                    <AntDesign name={icon} size={24} color="#FD8033" />
                    <ButtonTitle>{title}</ButtonTitle>
                </View>
            </TouchableOpacityButtonEnable>
        )  
    }
}