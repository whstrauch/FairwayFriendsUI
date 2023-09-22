import React from 'react';
import { StyleSheet } from 'react-native';
import { Pressable, Text } from 'react-native';

type Props = {
    style?: object
    textStyle?: object 
    onPress: Function
    text: string
    type: string
}

const Button = (props: Props) => {
    const mainColor = props.type === "cancel" ? '#bebfc2' : '#006B54'
    const pressedColor = props.type === "cancel" ? '#8c8d8f': '#66a698'

    return (
        <Pressable style={({pressed}) => [
            {
                backgroundColor: pressed ? pressedColor : mainColor,
            },
            styles.button,
            props.style
            ]} 
            onPress={() => props.onPress()}
        >
            <Text style={[styles.buttonText, props.textStyle]}>{props.text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16
    }
})

export {Button};