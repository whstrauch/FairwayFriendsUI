import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeStackNavigation } from '../types';

type Props = NativeStackScreenProps<HomeStackNavigation, "Home">

const CustomHeader = ({navigation}: Props) => {


    return (
        <View style={styles.background}>
            <SafeAreaView style={styles.container}>
                <View style={{flex: 1}}></View>
                <Text style={styles.title}>Feed</Text>
                <View style={{flex: 1}}>
                    <Icon
                        name="ios-notifications-outline"
                        size={22}
                        style={{alignSelf: 'flex-end'}}
                        onPress={() => navigation.navigate("Notification2")}
                    />
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        display: 'flex',
        backgroundColor: 'white'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        flex: 1,
        textAlign: 'center'
    }
})

export default CustomHeader;