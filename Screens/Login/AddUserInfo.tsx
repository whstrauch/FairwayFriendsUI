import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import Icon  from 'react-native-vector-icons/Ionicons';
import { Button } from '../../Components/Button';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';
import { LoginNavigation } from '../../types';

type UserInfo = {
    firstName: string;
    lastName: string;
    bio: string;
    public: boolean;
}

const initialForm = {
    firstName: "",
    lastName: "",
    bio: "",
    public: true
}

type Props = NativeStackScreenProps<LoginNavigation, 'UserInfo'>

const AddUserInfo = ({route, navigation}: Props) => {
    const {user} = useAuth();
    const [formState, setFormState] = useState<UserInfo>(initialForm)

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const changeForm = (val: string, text: string) => {
        setFormState({
            ...formState,
            [val]: text
        })
    }

    const cancel = () => {
        Alert.alert(
            'Discard changes?',
            'You have unsaved changes. Are you sure you want to go back?',
            [
              { text: "Don't leave", style: 'cancel', onPress: () => {} },
              {
                text: 'Discard',
                style: 'destructive',
                // If the user confirmed, then we dispatch the action we blocked earlier
                // This will continue the action that had triggered the removal of the screen
                onPress: () => {
                    // Delete from userId from AUth table
                    navigation.goBack()
                },
              },
            ]
          );
    }

    const submit = () => {
        const body = {
            username: route.params.username,
            name: `${formState.firstName} ${formState.lastName}`,
            bio: formState.bio,
            user_id: user.user_id,
            public: !isEnabled
        }

        customFetch('user/create', "POST", body, user.jwt).then(res =>
            {navigation.navigate("MainApp")}
        ).catch(err => console.log(err.info))
    }


    return (
        <View style={styles.pageContainer}>
            <KeyboardAvoidingView style={{flex: 0.6, justifyContent: 'center'}} behavior='padding'>
            <View style={styles.nameContainer}>
                <TextInput
                    placeholder="First Name"
                    style={styles.sectionNameText}
                    onChangeText={text => changeForm("firstName", text)}
                    value={formState.firstName}
                    autoComplete="given-name"
                    autoCorrect={false}
                />
                <TextInput
                    placeholder="Last Name"
                    style={styles.sectionNameText}
                    onChangeText={text => changeForm("lastName", text)}
                    value={formState.lastName}
                    autoComplete="family-name"
                    autoCorrect={false}
                />
            </View>
            <TextInput
                placeholder='Bio'
                style={styles.sectionText}
                value={formState.bio}
                onChangeText={text => changeForm("bio", text)}
                multiline
                maxLength={240}
            />
            <View style={styles.accountType}>
                <Icon name={isEnabled ? 'lock-closed-outline' : 'lock-open-outline'} size={22}/>
                <Text>Private Account:</Text>
                <Switch
                    trackColor={{false: 'white', true: '#006B54'}}
                    thumbColor={'white'}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{marginLeft: 'auto'}}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button type='cancel' text='Cancel' onPress={cancel} style={{width: '40%', borderRadius: 5}}/>
                <Pressable 
                    style={({pressed}) =>
                            [
                                {
                                    backgroundColor: pressed ? '#66b0ff' : '#007AFF',
                                },
                                styles.signUpButton,
                            ]}
                    onPress={() => submit()}
                >
                    <Text style={{color: 'white', fontSize: 16}}>Finish</Text>
                </Pressable>
            </View>
            
        </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: '80%',
        
    },
    nameContainer: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly'
    },
    sectionNameText: {
        padding: 12,
        marginVertical: 12,
        width: '48%',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    sectionText: {
        textAlignVertical: 'center',
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 12,
        width: '100%',
        marginVertical: 12,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
    },
    accountType: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 12,
        marginBottom: 24
    },
    signUpButton: {
        paddingVertical: 8,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center'
      }
})

export default AddUserInfo;