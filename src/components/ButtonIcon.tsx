import { ActivityIndicator } from 'react-native';
import style from "styled-components/native";
import { SimpleLineIcons } from '@expo/vector-icons';

export const TouchableOpacityButtonEnable = style.TouchableOpacity`
    background-color: #FD8033;
    align-content: center;
    justify-content: center;
    width: 85%;
    border-radius: 15px;
    height: 55px;
`;

export const TouchableOpacityButtonDisabled = style.TouchableOpacity`
    background-color: #E4E4E4;
    align-content: center;
    justify-content: center;
    width: 85%;
    border-radius: 15px;
    height: 55px;
`;

export const Area = style.View`
    align-content: center;
    justify-content: center;
    flex-direction: row;
`;

export const ButtonTitle = style.Text`
    color: #FFF;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    padding-left: 10px;
`;

export default ({title, onPressIn, isLoading, icon, disabled}) => {
    if (disabled) {
        return (
            <TouchableOpacityButtonDisabled
                onPressIn={onPressIn} 
                disabled={disabled}
            >
                <Area>
                    <SimpleLineIcons name={icon} size={24} color="white" />
                    {isLoading? (
                        <ActivityIndicator color='#FFF'/> 
                    ) : (
                        <ButtonTitle>{title}</ButtonTitle>
                    )}
                </Area>
            </TouchableOpacityButtonDisabled>
        ) 
    } else {
        return (
            <TouchableOpacityButtonEnable
                onPressIn={onPressIn} 
                disabled={disabled}
            >
                <Area>
                    <SimpleLineIcons name={icon} size={24} color="white" />
                    {isLoading? (
                        <ActivityIndicator color='#FFF'/> 
                    ) : (
                        <ButtonTitle>{title}</ButtonTitle>
                    )}
                </Area>
            </TouchableOpacityButtonEnable>
        )
    }
}