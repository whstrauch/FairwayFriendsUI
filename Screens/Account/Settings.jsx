import { CommonActions } from '@react-navigation/native';
import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import { useAuth } from '../../Context/UserContext';
import { AccountStackNavigation } from '../../types';


const Settings = ({navigation}) => {
    const {setUser} = useAuth();

    const rootNav = navigation.getParent("Root")

    const logout = () => {
        Alert.alert("Logout", "Are you sure?", [
            {
              text: 'Logout',
              onPress: () => {
                
                rootNav?.dispatch(
                    CommonActions.reset({
                        index: 1,
                        routes: [
                            { name: 'Login'}
                        ]
                    })
                )
                setUser({
                    jwt: null,
                    user_id: null
                })
              },
            },
            {
              text: 'Cancel',
              onPress: undefined,
              style: 'cancel',
            }])
    }


    return (
        <View>
            <View style={{alignItems: 'center', padding: 20, borderBottomWidth: 0.5,
        borderBottomColor: 'gray'}}>
                <Text>More settings to be added.</Text>
            </View>
            <Pressable style={({pressed}) => [styles.row, {backgroundColor: pressed ? "lightgray" : "white"}]} onPress={() => logout()}>
                <Icon name='exit-outline' size={25} color="#006B54" />
                <Text style={styles.text}>Logout</Text>
                <Icon name="chevron-forward-outline" size={25} color="gray"/>
            </Pressable>
        </View>
        
        
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: 'gray',
        marginRight: 'auto',
        marginLeft: 10
    }
})

export default Settings;