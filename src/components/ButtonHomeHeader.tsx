import { ActivityIndicator } from 'react-native';
import style from "styled-components/native";
import { SimpleLineIcons  } from '@expo/vector-icons';

export const TouchableOpacityButton = style.TouchableOpacity`
    align-content: center;
    justify-content: center;
    width: 20%;
`;

export const Area = style.View`
    align-content: center;
    justify-content: center;
    flex-direction: row;
`;


export default ({onPressIn, icon, disabled}) => {
    return (
        <TouchableOpacityButton
            onPressIn={onPressIn} 
            disabled={disabled}
        >
            <Area>
                <SimpleLineIcons  name={icon} size={24} color="white" />
            </Area>
        </TouchableOpacityButton>
    )
}
