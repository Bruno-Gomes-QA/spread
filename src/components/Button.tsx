import { ActivityIndicator } from 'react-native';
import style from "styled-components/native";

export const TouchableOpacityButtonDisable = style.TouchableOpacity`
    background-color: #E4E4E4;
    align-content: center;
    justify-content: center;
    width: 85%;
    border-radius: 15px;
    height: 55px;
`;

export const TouchableOpacityButtonEnable = style.TouchableOpacity`
    background-color: #FD8033;
    align-content: center;
    justify-content: center;
    width: 85%;
    border-radius: 15px;
    height: 55px;
`;

export const ButtonTitle = style.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
`;

export default ({title, onPressIn, isLoading, disabled}) => {
    if (disabled) {
        return (
            <TouchableOpacityButtonDisable
                disabled={disabled}
                onPressIn={onPressIn} 
            >
                {isLoading? (
                    <ActivityIndicator color='#FFF'/> 
                ) : (
                    <ButtonTitle>{title}</ButtonTitle>
                )}
            </TouchableOpacityButtonDisable>
        ) 
    } else {
        return (
            <TouchableOpacityButtonEnable
                disabled={isLoading}
                onPressIn={onPressIn} 
            >
                {isLoading? (
                    <ActivityIndicator color='#FFF'/> 
                ) : (
                    <ButtonTitle>{title}</ButtonTitle>
                )}
            </TouchableOpacityButtonEnable>
        )  
    }
}