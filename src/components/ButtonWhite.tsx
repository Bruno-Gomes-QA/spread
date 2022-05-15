import { ActivityIndicator } from 'react-native';
import style from "styled-components/native";

export const TouchableOpacityButtonDisable = style.TouchableOpacity`
    align-content: center;
    justify-content: center;
    width: 85%;
    border-radius: 15px;
    height: 55px;
`;

export const TouchableOpacityButtonEnable = style.TouchableOpacity`
    background-color: #FFF;
    align-content: center;
    justify-content: center;
    width: 85%;
    border-radius: 15px;
    height: 55px;
`;

export const ButtonTitle = style.Text`
    color: #FD8033;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

export const ButtonTitleDisable = style.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

export default ({title, onPressIn, isLoading, disabled}) => {
    if (disabled) {
        return (
            <TouchableOpacityButtonDisable
                onPressIn={onPressIn} 
            >
                {isLoading? (
                    <ActivityIndicator color='#FD8033'/> 
                ) : (
                    <ButtonTitleDisable>{title}</ButtonTitleDisable>
                )}
            </TouchableOpacityButtonDisable>
        ) 
    } else {
        return (
            <TouchableOpacityButtonEnable
                onPressIn={onPressIn} 
            >
                {isLoading? (
                    <ActivityIndicator color='#FD8033'/> 
                ) : (
                    <ButtonTitle>{title}</ButtonTitle>
                )}
            </TouchableOpacityButtonEnable>
        )  
    }
}