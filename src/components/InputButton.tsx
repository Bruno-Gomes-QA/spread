import styled from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, TextInput } from 'react-native';

const InputArea = styled.View`
    width: 90%;
    height: 60px;
    border: 2px;
    border-color: #E4E4E4;
    flex-direction: row;
    border-radius: 30px;
    padding-left: 15px;
    align-items: center;
    margin-bottom: 15px;
`;

const styles = StyleSheet.create({
    textinput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingLeft: 10,
        paddingRight: 10,
    }
})

export default ({Icon, placeholder, value, onChangeText, password, maxLength, keyboardType, validate, autoCapitalize, editable}) => {
    var colorIcon
    if(validate === 1) {
        colorIcon = 'black'
    } 
    else if (validate === 2) {
        colorIcon = 'red'
    } else if (validate === 3) {
        colorIcon = 'green'
    }
    return(
        <InputArea>
            <AntDesign name={Icon} size={24} color={colorIcon} />
            <TextInput
                style={styles.textinput}
                placeholder={placeholder}
                editable={editable}
                value={value}
                secureTextEntry={password}
                onChangeText={onChangeText}
                maxLength={maxLength}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
        </InputArea>
    )
}