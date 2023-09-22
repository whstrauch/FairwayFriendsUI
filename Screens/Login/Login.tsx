import React, { useState } from 'react';
import { Button, KeyboardAvoidingView, Pressable, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { LoginEntry } from '../../Components/LoginEntry';
import { WelcomeBlock } from '../../Components/WelcomeBlock';
const course = require('../../Assets/GolfCourse.png');

const Login = () => {

    return (
        <View style={styles.container}>
            <WelcomeBlock image={course} title="Welcome to FairwayFriends"/>
            <LoginEntry />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        alignItems: 'center'
    }
})

export { Login };