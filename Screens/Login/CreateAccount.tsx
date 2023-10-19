import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import { View, Text, KeyboardAvoidingView, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Pressable, SafeAreaView } from 'react-native';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';
import { LoginNavigation } from '../../types';

type CreateAccountForm = {
    username: string;
    email: string;
    pwrd: string;
}

const initialForm = {
    username: "",
    email: "",
    pwrd: ""
}


const CreateAccount = () => {
    //READ BELOW
    // Make sure the return button focuses the next field or submits the form

    const navigation = useNavigation<NativeStackNavigationProp<LoginNavigation>>();

    const {setUser} = useAuth()
    const [formState, setFormState] = useState<CreateAccountForm>(initialForm);
    const [error, setError] = useState<string>("")



    const changeForm = (val: string, text: string) => {
        setFormState({
            ...formState,
            [val]: text
        })
    }

    const submitCreate = () => {
        if (formState.username.length < 5) {
            setError("Username must be at least 5 characters.")
        } else if (formState.pwrd.length < 8) {
            setError("Password must be at least 8 characters.")
        } else if (!formState.email.includes("@")) {
            setError("Please provide valid email address.")
        } else {
            const body = {
                email: formState.email,
                username: formState.username,
                password: formState.pwrd
            }
        
            customFetch("create", "POST", body, "").then(resp => {
                if (resp.access_token) {
                    setError("")
                    setUser({
                        jwt: resp.access_token,
                        user_id: resp.user.user_id
                    })
                    return resp.user.username
                }
            }).then(user => navigation.navigate("UserInfo", {username: user})).catch(err => {console.log(err.info); setError(err.info)})

        }
    }




    return(
        <SafeAreaView style={{flex: 1}}>
                <View style={styles.formContainer}>
                    <TextInput
                        placeholder="Email"
                        style={styles.sectionText}
                        onChangeText={text => changeForm("email", text)}
                        value={formState.email}
                        autoCapitalize='none'
                        keyboardType="email-address"
                        autoComplete="email"
                        autoCorrect={false}
                    />
                    <TextInput
                        placeholder="Username"
                        style={styles.sectionText}
                        onChangeText={text => changeForm("username", text)}
                        value={formState.username}
                        autoCapitalize='none'
                    />
                    <TextInput
                        placeholder="Password"
                        style={styles.sectionText}
                        onChangeText={text => changeForm("pwrd", text)}
                        value={formState.pwrd}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                    
                    
                </View>
                <KeyboardAvoidingView style={{marginTop: 'auto'}} behavior='padding'>
                        <Pressable style={({pressed}) => [
                                    {
                                        backgroundColor: pressed ? '#66b0ff' : '#007AFF',
                                    },
                                    styles.signUpButton,
                                    ]} 
                                    onPress={() => submitCreate()}
                        >
                            <Text style={{color: 'white'}}>Create Account</Text>
                        </Pressable>
                        <Text style={{color: 'red', margin: 12, alignSelf: 'center'}}>{error}</Text>

                </KeyboardAvoidingView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    pageContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center'
    },
    formContainer: {
        display: 'flex',
        flex: 1,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionText: {
        padding: 12,
        width: '100%',
        margin: 12,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    signUpButton: {
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: '90%'
      }, 
})

export { CreateAccount };