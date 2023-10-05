import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, {useState} from 'react';
import { View, Pressable, Text, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { LoginNavigation } from '../types'; 
import { Button } from './Button';
import customFetch from '../HelperFunctions/request';
import { useAuth } from '../Context/UserContext';

const LoginEntry = () => {
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [pressed, setPressed] = useState<Boolean>(false);
    const {setUser} = useAuth();

    const navigation = useNavigation<NativeStackNavigationProp<LoginNavigation>>();

    const login = () => {
        customFetch('login', "POST", {"username": username, "password": password})
        .then(data => setUser({
            jwt: data.access_token,
            user_id: data.user.user_id
        }))
        .then(data => navigation.navigate('MainApp'))
        .catch(error => console.log(error))
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Text style={{marginTop: 10}}>Already have an account?</Text>
            <TextInput 
                placeholder='Username' 
                value={username} 
                onChangeText={setUsername} 
                autoCorrect={false} 
                autoCapitalize="none"
                style={styles.textInput}
            />
            <TextInput 
                placeholder='Password' 
                value={password} 
                onChangeText={setPassword} 
                secureTextEntry={true}
                style={styles.textInput}
            />
            <View style={styles.loginButtonContainer}>
                <Button type="main" text="Login" onPress={() => login()} style={{width: '50%', paddingVertical: 10}} />
                <Pressable 
                    style={styles.forgotPasswordButton}
                    onPressIn={() => setPressed(true)}
                    onPressOut={() => setPressed(false)}
                    onPress={() => navigation.navigate('ResetPassword')}
                >
                    <Text style={[{color: pressed ? 'blue' : 'black'}, styles.forgotPasswordText]}>Forgot Password?</Text>
                </Pressable>
            </View>
            <Text style={{marginTop: 15}}>New to Fairway Friends?</Text>
            <Pressable style={({pressed}) => [
                {
                    backgroundColor: pressed ? '#66b0ff' : '#007AFF',
                },
                styles.signUpButton,
                ]}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    loginButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        width: '80%',
        marginTop: 5
    },
    loginButton: {
        width: '50%',
        borderRadius: 10,
        padding: 2
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 16
    },
    forgotPasswordButton: {
        justifyContent: 'center'
    },
    forgotPasswordText: {
        alignSelf: 'center',
        textDecorationLine: "underline"
    },
    textInput: {
        padding: 12,
        width: '80%',
        margin: 6,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    signUpButton: {
        width: "80%",
        borderRadius: 20,
        padding: 10,
        marginTop: 5,
        marginBottom: 50
    }
})

export {LoginEntry};