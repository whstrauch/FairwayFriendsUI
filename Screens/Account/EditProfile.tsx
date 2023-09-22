import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Switch, KeyboardAvoidingView, Image } from 'react-native';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { Button } from '../../Components/Button';
import { IRButton } from '../../Components/IRButton';
import { useAuth } from '../../Context/UserContext';
import { useUser } from '../../HelperFunctions/dataHook';
import customFetch from '../../HelperFunctions/request';
import { AccountStackNavigation } from '../../types';
import Toast from 'react-native-simple-toast';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import useSWR from 'swr';

type Props = NativeStackScreenProps<AccountStackNavigation, 'EditProfile'>

const rows = ["Name", "Username", "Bio"]

const EditProfile = ({route, navigation}: Props) => {
    const {user} = useAuth()
    const [userValues, setUserValues] = useState<any>({
        "Name": route.params.name,
        "Username": route.params.username,
        "Bio": route.params.bio,
        public: route.params.public 
    })
    const {isLoading: profilePictureLoading, data: profPic} = useSWR(() => route.params.prof_pic, fetch)
    const [updatedProfPic, setUpdatedProfPic] = useState<Asset>();

    const onChange = (text: any, val: string) => {
        console.log(route.params)
        setUserValues({
            ...userValues,
            [val]: text
        })
    }

    const save = async () => {
        let updated = false
        if (updatedProfPic !== undefined) {
            const data = new FormData()
            data.append("profile_pic", {
                name: updatedProfPic.fileName,
                type: updatedProfPic.type,
                uri: updatedProfPic.uri
            })
            data.append("user_id", user.user_id)
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": "Bearer " + user.jwt
                },
                body: data
            }
            await fetch("http://127.0.0.1:5000/user/profile_pic", options).then(res => 
                updated = true
            ).catch(err => console.log(err.info))
        }
        if (userValues.Name !== route.params.name || userValues.Username !== route.params.username || userValues.Bio !== route.params.bio || userValues.public !== route.params.public || updated) {
            const body = {
                username: userValues.Username,
                name: userValues.Name,
                bio: userValues.Bio,
                public: userValues.public
            }
            await customFetch(`user/update/${route.params.id}`, "PUT", body, user.jwt).then(res => 
                updated = true
            ).catch(err => console.log(err.info))
        }
        if (updated) {
            Toast.show("Profile updated...", 3)
        } else {
            Toast.show("No changes", 3)
        }
        
        navigation.pop()

    }

    const imageSelector = async () => {

        const result = await launchImageLibrary({mediaType: 'photo', selectionLimit: 1, includeExtra: true})
        if (result.errorCode) {
            throw Error(result.errorMessage)
        }

        if (result.assets !== undefined && !result.didCancel) {
                setUpdatedProfPic(result.assets[0])
        }
        // Take images and add thumbnails to view
    }


    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding'>
            <View style={styles.container}>
            <View style={styles.sectionContainer}>
                {updatedProfPic === undefined ? profPic === undefined ? <Icon name='accout-person-outline'/> : <Image source={profPic} width={200} height={200} style={{width: 100, height: 100, borderRadius: 50}}/> : <Image source={{uri: updatedProfPic.uri}} width={200} height={200} style={{width: 100, height: 100, borderRadius: 50}}/>}
                <Pressable onPress={() => imageSelector()} style={{marginTop: 10}}>
                    <Text style={styles.editPicture}>Edit Profile Picture</Text>
                </Pressable>
            </View>
            {rows.map(val => 
            <View style={styles.sectionContainer} key={val}>
                <Text style={{alignSelf: 'flex-start', marginLeft: 10}}>{val}:</Text>
                <TextInput
                    value={userValues[val]}
                    onChangeText={(text) => onChange(text, val)}
                    style={styles.textContainer}
                />
            </View>
            )}
            <View style={styles.accountType}>
                <Icon name={!userValues.public ? 'lock-closed-outline' : 'lock-open-outline'} size={22}/>
                <Text>Private Account:</Text>
                <Switch
                    trackColor={{false: 'white', true: '#006B54'}}
                    thumbColor={'white'}
                    onValueChange={(bool) => onChange(!bool, "public")}
                    value={!userValues.public}
                    style={{marginLeft: 'auto', transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button type="cancel" style = {styles.button} text="Cancel" onPress={() => navigation.goBack()}/>
                <Button type="main" style = {styles.button} text="Save" onPress={() => save()}/>
            </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly', 
        alignItems: 'center',
        flex: 0.8,
    },
    sectionContainer: {
        width: '80%',
        alignItems: 'center'
    },
    textContainer: {
        borderWidth: 1,
        borderRadius: 20,
        width: '100%',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch'
    },
    button: {
        width: '35%'
    },
    editPicture: {
        color: "#006B54",
        fontSize: 12
    },
    accountType: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%'
    }

})

export default EditProfile;