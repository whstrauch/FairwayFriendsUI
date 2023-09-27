import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Image, ActionSheetIOS, KeyboardAvoidingView, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, ActivityIndicator, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {QuickScore} from '../../Components/QuickScore';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import { Button } from '../../Components/Button';
import SearchComponent from '../../Components/SearchComponent';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useScore } from '../../Context/ScoreContext';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PlayStackNavigation } from '../../types';
import FriendModal from '../../Components/FriendModal';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';
import Toast from 'react-native-simple-toast';
import Loading from '../../Components/Loading';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<PlayStackNavigation, "PostRound">
type friend = {
    user_id: string;
    name: string;
    username: string;
}

const PostRound = ({route, navigation}: Props) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [modalVisible, setModalVisible] = useState(false)
    const [taggedFriends, setTaggedFriends] = useState<friend[]>([])
    const [images, setImages] = useState<Asset[]>([])
    const {score} = useScore()
    const {user} = useAuth()
    const [loading, setLoading] = useState(false)

    const tabNavigation = navigation.getParent('Tabs') // TS Error from react navigation

    useEffect(() => {
        navigation.setOptions({
            title: route.params.courseName === '' ? 'Post' : route.params.courseName,
          });
    }, [navigation])


    const removeTag = (friend: friend) => {
        // change to id when plumbed up
        setTaggedFriends(taggedFriends.filter(item => item.user_id !== friend.user_id))
    }

    const addTag = (friend: friend) => {
        // change to id when plumbed up
        if (!taggedFriends.includes(friend)) {
            setTaggedFriends([...taggedFriends, friend])
        } else {
            setModalVisible(false)
        }
        
    }


    const imageSelector = async () => {

        const result = await launchImageLibrary({mediaType: 'mixed', selectionLimit: 10, includeExtra: true})
        if (result.errorCode) {
            throw Error(result.errorMessage)
        }

        if (result.assets !== undefined && !result.didCancel) {
            if (images.length + result.assets.length > 10) {
                Alert.alert('Invalid', 'Must select 10 items or less.')
            } else {
                setImages([...images, ...result.assets])
            }
            
        }
        // Take images and add thumbnails to view
    }

    const removeImage = (image: Asset) => {
        setImages(prev => prev.filter(img => img.uri !== image.uri))
    }

    const actionSheet = (image: Asset) => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Cancel', "Clear All", 'Delete Image' ],
                cancelButtonIndex: 0
            },
            buttonIndex => {
                if (buttonIndex === 2) {
                    removeImage(image)
                } else if (buttonIndex === 1) {
                    setImages([])
                }

            }
        )
    }

    const post = async () => {
        setLoading(true)
        const data = new FormData();
        let size = []
        for (let i = 0; i < images.length; i++) {
            data.append("uploadFiles[]", {
                name: images[i].fileName,
                type: images[i].type,
                uri: images[i].uri
            });
            size.push([images[i].width, images[i].height])
        }
        data.append("size[]", size)
        console.log(taggedFriends)
        let tags = []
        for (let i = 0; i < taggedFriends.length; i++) {
            tags.push([
                taggedFriends[i].user_id,
                taggedFriends[i].name
            ])
        }

        data.append("taggedFriends[]", tags)

        data.append("user", user.user_id)
        data.append("score", score.userScore)
        data.append("course_id", route.params?.courseId)
        data.append("course_name", route.params.courseName)
        data.append("title", title)
        data.append("description", description)

        console.log(data)
        
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "Bearer " + user.jwt
            },
            body: data
        }

        fetch("http://127.0.0.1:5000/post", options)
        .then((res) => {
            console.log(res);
            if (res.ok) {
                setLoading(false);
                Toast.showWithGravity("Successful Upload", 4, 4, {backgroundColor: '#006B54', textColor: 'white'})
                tabNavigation?.navigate("HomeStack");
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Play'}]
                });
            } else {
                setLoading(false)
                Toast.showWithGravity("Upload Failed", 4, 4, {backgroundColor: 'red', textColor: 'white'})
            }
        })
        .catch((err) => {
            console.log(err)
        })

    }

    return (
        <>
        <SafeAreaView style={{display: 'flex', height: '100%'}}>
            <KeyboardAwareScrollView style={{opacity: loading ? 0.3 : 1}}>
            
                <QuickScore></QuickScore>
                {/* <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{height: '100%'}}></View>
                </TouchableWithoutFeedback> */}
                
                <View style={{height: 5, backgroundColor: '#c8c8c8', marginVertical: 10}}></View>
                <View style={{flexDirection: 'row', marginLeft: 20}}>
                    <Text style={{fontSize: 16, color: '#666666'}}>Title:</Text>
                    <TextInput 
                        placeholder='Add a title' 
                        value={title}
                        onChangeText={setTitle}
                        style={{flex: 1, fontSize: 16, marginLeft: 5}}
                    />
                </View>
                <Divider horizontalInset={true} style={{marginVertical: 10}}/>
                <View style={{flexDirection: 'row', marginLeft: 20, height: 50}}>
                    <Text style={{fontSize: 14, marginTop: 5, color: '#666666'}}>Description:</Text>
                    <TextInput 
                        multiline={true}
                        editable={true}
                        numberOfLines={2}
                        placeholder='Add a description' 
                        value={description}
                        onChangeText={setDescription}
                        style={{flex: 1, fontSize: 14, marginLeft: 5}}
                    />
                </View>
                <Divider horizontalInset={true} style={{marginVertical: 10}} />
                <Pressable style={{flexDirection: 'row', flexWrap: 'wrap', marginLeft: 20, minHeight: 30, alignItems: 'center'}} onPress={() => imageSelector()}>
                    <Icon name='image-outline' size={30} color={'#006B54'}/>
                    
                    {images.length > 0 ? 

                            images.map((image) => 
                            <Pressable onPress={() => actionSheet(image)}>
                                <Image source={{uri: image.uri}} width={50} height={50} style={{margin: 5}}/>
                            </Pressable>    
                             ) : 
                    <Text style={{fontSize: 14, marginTop: 4, color: '#666666'}}>  Add Photos</Text>
                    }
                </Pressable>
                <Divider horizontalInset={true} style={{marginVertical: 10}} />
                <Pressable style={{flexDirection: 'row', marginLeft: 20, minHeight: 30, alignItems: 'center'}} onPress={() => setModalVisible(true)}>
                    <Icon name='person-add-outline' size={25} color={'#006B54'}/>
                    {taggedFriends.length < 1 ? 
                        <Text style={{fontSize: 14, marginTop: 4, color: '#666666'}}>  Add Playing Partners</Text> 
                            :
                            <View style={styles.chipContainer}>
                            {taggedFriends.map((value: friend) => {
                                return(
                                    <Pressable style={styles.chip} onPress={() => removeTag(value.user_id)}>
                                        <Text style={{color: 'white'}}>{value.name}</Text>
                                        <Icon name='close-outline' size={17} color='white'/>
                                    </Pressable>    
                                )
                            })}
                        </View>
                    }
                </Pressable>
                <Divider horizontalInset={true} style={{marginVertical: 10}} />
                
                <Button type='main' text='Post Round' onPress={() => post()} style={{width: '50%', alignSelf: 'center', padding: 10, marginBottom: 10}}/>
                
            </KeyboardAwareScrollView>
            {loading && <Loading/>}
        </SafeAreaView>
        <FriendModal modalVisible={modalVisible} setModalVisible={setModalVisible} 
            addTag={addTag} taggedFriends={taggedFriends} 
            removeTag={removeTag} />
        
    </>
    );
};

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      height: '50%',
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    dragPill: {
        width: 40,
        height: 5,
        borderRadius: 2.5,
        backgroundColor: 'grey',
        marginVertical: 5
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '90%',
        margin: 5,
        alignItems: 'flex-start'
    },
    chip: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#006B54',
        paddingHorizontal: 10,
        paddingVertical: 5,
        margin: 1,
        borderRadius: 100
    },
    addButton: {
        borderColor: '#006B54',
        borderWidth: 1,
        borderRadius: 3,
        padding: 5,
        marginRight: 10
    }
  });

export {PostRound};