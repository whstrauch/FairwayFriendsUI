import React, {useState} from 'react';
import { ImageBackground, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from '../../Components/Button';
import Loading from '../../Components/Loading';
import customFetch from '../../HelperFunctions/request';
const blob = require('../../Assets/greenblob.png');

const ForgotPassword = () => {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const [sendingEmail, setSendingEmail] = useState(false)
    const [success, setSuccess] = useState(false)

    const changeText = (text: string) => {
        setEmail(text)
        if (error !== "") {
            setError("")
        }
    }

    const onSubmit = () => {
        setSendingEmail(true)
        console.log("attempted fetch"
        )
        customFetch('user/password-reset', "POST", {"email": email}).then(res => {
            setSuccess(true)
            setSendingEmail(false)
        }).catch(err => {setError(err.info); setSendingEmail(false)})
    }

    return (
        <SafeAreaView style={{flex: 1}}>
                {/* <View style={styles.headerTextContainer}> */}
                    <ImageBackground source={blob} style={styles.headerTextContainer} resizeMode="contain">
                        <Icon name="key" size={50}/>
                        <Text style={styles.headerText}>
                                Forgot Password?
                        </Text>
                        <Text>Have reset password link sent to your email below</Text>
                    </ImageBackground>
                {/* </View> */}
                <View style={styles.container}>
                    {success ? 
                    <View style={styles.successContainer}>
                        <Text style={{fontSize: 20}}>Email successfully sent.</Text>
                        <Text style={{lineHeight:16}}>Please follow directions in email. Email may take up to 10 minutes to arrive. Please check spam folder before trying again.</Text>
                    </View>
                    : 
                    <>
                    <TextInput 
                        style={styles.textInput}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={changeText}
                        autoComplete="email"
                        keyboardType='email-address'
                        placeholder="Enter email..."
                        
                    />
                    {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null}
                    <Button type="main" text='Send Reset Email' onPress={onSubmit} style={styles.button}/>
                    </>}
                </View>
                {sendingEmail && <Loading />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    headerTextContainer: {
        display: 'flex',
        flex: 0.45,
        alignItems: 'center',
        justifyContent: 'center'
    },
    successContainer: {
        width: "80%",
        alignItems: 'center',
    },
    headerText: {
        fontSize: 30
    },
    textInput: {
        padding: 12,
        width: '80%',
        height: 44,
        margin: 6,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    button: {
        margin: 15,
        height: 44,
        width: "50%"
    },
    errorText: {
        color: 'red'
    }
      
})

export {ForgotPassword};