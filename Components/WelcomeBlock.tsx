import React from 'react';
import { Image, ImageBackground, View, StyleSheet, Text, SafeAreaView, Pressable, Keyboard } from 'react-native';

type Props = {
    image: any
    title?: string
    message?: string
}

const WelcomeBlock = (props : Props) => {
    return (
        <ImageBackground style={styles.image} source={props.image}>
            <Pressable onPress={() => Keyboard.dismiss()}>
            <SafeAreaView>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.messageContainer}>
                    {/* <Text style={{fontSize: 20, color:'white'}}>Welcome</Text> */}
                    <Text style={{fontSize: 20, color:'white'}}>{props.message}</Text>
                </View>
            </SafeAreaView>
            </Pressable>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 400,
        height: 450,
        resizeMethod: 'auto',
        flex: 1
    },
    title: {
        width: '70%',
        textAlign: 'center',
        alignSelf: "center",
        flexWrap: 'wrap',
        fontSize: 30,
        fontWeight: 'bold'
    },
    messageContainer:{
        marginTop: 'auto',
        paddingLeft: 15,
        paddingBottom: 15
    }
})

export { WelcomeBlock };