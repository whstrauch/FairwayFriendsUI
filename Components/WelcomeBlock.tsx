import React from 'react';
import { Image, ImageBackground, View, StyleSheet, Text, SafeAreaView, Pressable, Keyboard } from 'react-native';

type Props = {
    image: any
    title?: string
    message?: string
}

const WelcomeBlock = (props : Props) => {
    return (
        <Pressable onPress={() => Keyboard.dismiss()} style={{display: 'flex', flex: 1}}>
        <ImageBackground style={styles.image} source={props.image}>
            
            <SafeAreaView>
                <Text style={styles.title}>{props.title}</Text>
                <View style={styles.messageContainer}>
                    {/* <Text style={{fontSize: 20, color:'white'}}>Welcome</Text> */}
                    <Text style={{fontSize: 20, color:'white'}}>{props.message}</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 450,
        height: 500,
        resizeMethod: 'auto'
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