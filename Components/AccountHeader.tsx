import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { isBoolean } from 'lodash';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '../Context/UserContext';
import customFetch from '../HelperFunctions/request';
import { AccountStackNavigation } from '../types';

type props = {
    user: {
        name: string;
        username: string;
        user_id: string | number;
        bio: string;
        followers: number;
        following: number;
    };
    mainUser: {
        user_id: string;
        jwt: string;
    }
    isMain: boolean;
    isFollowing: string;
}

const AccountHeader = ({user, mainUser, isMain, isFollowing, profPic} : props | any) => {

    const navigation = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>();
    const [followingStatus, setFollowingStatus] = useState("new")
    
    useEffect(() => {
        setFollowingStatus(isFollowing)
    }, [isFollowing])
        //Call change follow api
    const toggleFollow = () => {
        console.log(isFollowing, followingStatus)
        // Call api to toggle follow
        const body = {
            user_id: mainUser.user_id,
            followee_id: user.user_id
        }
        let url = ""
        let method = ""
        let result = "";
        if (isFollowing == "pending" || isFollowing == "accepted") {
            url = "user/unfollow"
            method = "DELETE"
            result = "new"
        } else {
            url = "user/follow"
            method = "POST"
            result = "pending"
        }
        // customFetch(url, method, body, mainUser.jwt).then(data =>
        //     setFollowingStatus(result)
        // ).catch(err => console.log(err))
    }

    return (
        <View>
            <View style={styles.topContainer}>
                    <View style={styles.leftProfileContainer}>
                        <Image source={profPic} width={100} height={100} style={{height: 80, width: 80, borderRadius: 40}}/>
                        <View style={{flex: 1, marginLeft: 10, justifyContent: 'center'}}>
                            <Text style={{fontSize: 16}}>{user.name}</Text>
                            <Text style={{color: 'grey'}}>@{user.username}</Text>
                        </View>
                    </View>             
                    <View style={styles.rightProfileContainer}>
                        <View style={styles.followingContainer}>
                            <Pressable style={{flex: 1, alignItems: 'center'}} onPress={() => navigation.push('FollowingList', {type: 'Followers', user_id: user.user_id})}>
                                <Text style={{fontWeight: "bold", alignSelf: 'center'}}>{user.followers}</Text>
                                <Text>Followers</Text>
                            </Pressable>
                            <Pressable style={{flex: 1, alignItems: 'center'}} onPress={() => navigation.push('FollowingList', {type: 'Following', user_id: user.user_id})}>
                                <Text style={{fontWeight: "bold", alignSelf: 'center'}}>{user.following}</Text>
                                <Text>Following</Text>
                            </Pressable>
                        </View>
                        {isMain ?
                        <Pressable 
                            onPress={() => {
                                navigation.navigate('EditProfile', {name: user.name, username: user.username, bio: user.bio, prof_pic: profPic.url, id: user.user_id, public: user.public})}}
                            style={({pressed}) => [
                                {
                                    backgroundColor: pressed ? '#66a698' : '#006B54',
                                }, 
                                styles.editProfileContainer]}
                        >
                            <Icon name="ios-pencil-outline" size={14} color='white'/>
                            <Text style={{fontSize: 14, color: 'white'}}> Edit Profile</Text>
                        </Pressable> :
                        <Pressable 
                            onPress={() => toggleFollow()}
                            style={({pressed}) => [
                                {
                                    backgroundColor: pressed ? '#66a698' : followingStatus == "accepted" ? '#006B54' : 'grey'
                                }, 
                                styles.editProfileContainer]}
                        >
                            <Text style={{fontSize: 14, color: 'white', paddingHorizontal: 15}}>{followingStatus == "new" ? "Follow" : followingStatus == "pending" ? "Requested" : "Following"  }</Text>
                        </Pressable> 
                    }
                    </View>
                </View>
                <Text style={styles.bio}>{user.bio}</Text>
            <Divider />
        </View>
    );
};

const styles = StyleSheet.create({
    topContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: 15,
    },
    rightProfileContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftProfileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        marginLeft: 10,
        flex: 1.2
    },
    followingContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    editProfileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 15,
        marginTop: 15
    },
    bio: {
        fontSize: 12,
        marginHorizontal: 10,
        marginTop: 5,
        marginBottom: 15
    }
})

export default AccountHeader;