import React, { useEffect } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import useSWR from 'swr';
import { useAuth } from '../Context/UserContext';
import { API_URL } from '../Context/Vars';
import { UserRow } from './PostComponents/UserRow';

const NotificationRow = ({item, navigation}: any) => {
    const {user} = useAuth()
    const {isLoading, data: postPic} = useSWR(() => `https://${API_URL}/post/media/` + item.post.media[0].path, fetch)
    const {isLoading: isLoading2, data: profPic} = useSWR(() => `https://${API_URL}/user/profile_pic/` + item.user.profile_pic, fetch)


    return (
        item.n_type == 'like' ?
        <View style={styles.row}>
            <Pressable onPress={() => navigation.push('Profile', {user_id: item.user.user_id, main_user: user.user_id === item.user.user_id})}>
                <Image source={profPic} width={50} height={50} style={{width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0'}}/>
            </Pressable>
            <View style={{display: 'flex', flex: 1}}>
                <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>{item.user.name}</Text> liked your post.</Text>
            </View>            
            <Image source={postPic} width={40} height={40} style={{margin: 10}}/>
        </View> :
        <View style={styles.row}>
            <Pressable onPress={() => navigation.push('Profile', {user_id: item.user.user_id, main_user: user.user_id === item.user.user_id})}>
                <Image source={profPic} width={50} height={50} style={{width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0'}}/>
            </Pressable>
            <View style={{display: 'flex', flex: 1}}>
                <Text style={styles.text}><Text style={{fontWeight: 'bold'}}>{item.user.name}</Text> commented on your post: {item.subject.comment}</Text>
            </View>
            <Image source={postPic} width={40} height={40} style={{margin: 10}}/>
        </View> 
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    text: {
        display: 'flex',
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        marginRight: 'auto',
        paddingLeft: 5
    },
})

export default NotificationRow;