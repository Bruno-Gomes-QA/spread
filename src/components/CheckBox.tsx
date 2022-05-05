import style from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const TouchableOpacityButtonDisable = style.TouchableOpacity`
    width: 80%;
    height: 25px;
    flex-direction: row;
    align-items: center;
    align-content: center;
    margin-bottom: 15px;
`;

export const Text = style.Text`
    color: #000;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
    text-align: center;
`;


export default ({onPressIn, Check, Title}) => {
    if (Check) {
        return (
            <TouchableOpacityButtonDisable
                onPressIn={onPressIn}
            >
                <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={24} color="black" />
                <Text>
                    {Title}
                </Text>
            </TouchableOpacityButtonDisable>
        )
    } else {
        return (
            <TouchableOpacityButtonDisable
                onPressIn={onPressIn}
            >
                <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="black" />
                <Text>
                    {Title}
                </Text>
            </TouchableOpacityButtonDisable>
        )
    }

}