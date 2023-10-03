import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import { useAuth } from '../../Context/UserContext';
import customFetch from '../../HelperFunctions/request';
import { AccountStackNavigation, UserType } from '../../types';

const UserRow = ({user, type, timestamp}: UserType) => {
    const navigation = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>() 
    const [followingStatus, setFollowingStatus] = useState<string>(user?.is_following || "new")
    const {user: user2} = useAuth()
    const {isLoading, data: profPic} = useSWR(() => "http://localhost:5000/user/profile_pic/" + user.profile_pic, fetch)

    const goToProfile = () => {
        if (type !== 'add' && user.user_id !== undefined) {
            navigation.push('Profile', {user_id: user.user_id, main_user: user.user_id === user2.user_id})    
        }
    }

    const toggleFollow = () => {
        // Call api to toggle follow
        if (user.user_id == undefined) {
            console.log("FAILED")
        }
        const body = {
            user_id: user2.user_id,
            followee_id: user.user_id
        }
        let url = ""
        let method = ""
        let newStatus = ""
        if (followingStatus == "accepted" || followingStatus == "pending") {
            url = "user/unfollow"
            method = "DELETE"
            newStatus = "new"
        } else {
            url = "user/follow"
            method = "POST"
            newStatus = "pending"
        }
        customFetch(url, method, body, user2.jwt).then(data =>
            setFollowingStatus(newStatus)
        ).catch(err => console.log(err))
    }
    
    return (
        
        <Pressable style={styles.userRow} onPress={() => goToProfile()}>
            {!profPic?.ok ? <Icon size={40} name='person-circle'/> : <Image source={profPic} width={100} height={100} style={{width: 40, height: 40, borderRadius: 25, borderWidth: 1, borderColor: '#f0f0f0'}}/>}
            <View style={{paddingLeft: 5}}>
                <Text >{user?.name}</Text>
                {(type === 'list' || type === 'like' || type === "add") && <Text style={{color: 'grey'}}>@{user?.username}</Text>}
            </View>
            
            {type === 'comment' && <><Text> {'\u00B7'} </Text><Text style={{ fontWeight: '200', fontSize: 12 }}>{timestamp}</Text></>}
            {((type === 'list') && user?.user_id !== user2.user_id) && 
            <Pressable 
                style={[{ backgroundColor: followingStatus == "accepted" ? '#006B54' : 'grey'}, styles.followButton]}
                onPress={() => toggleFollow()}
            >
                <Text style={{color: 'white'}}>
                    {followingStatus == "accepted" ? 'Following' : followingStatus == "pending" ? "Requested" : 'Follow'}
                </Text>
            </Pressable>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingLeft: 10
    },
    followButton: {
        marginLeft: 'auto',
        marginRight: 5,
        paddingHorizontal: 10, 
        paddingVertical: 5, 
        borderRadius: 5,
    }
})

export { UserRow };