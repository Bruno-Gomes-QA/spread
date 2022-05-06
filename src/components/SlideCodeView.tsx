import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import { SlideCodeViewItem } from './SlideCodeViewItem';
import slides from './slides';


export function SlideCodeView() {
    return(
        <View style={styles.container}>
            <FlatList data={slides} renderItem={({item}) => <SlideCodeViewItem item={item}/>}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})