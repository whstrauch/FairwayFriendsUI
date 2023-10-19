import { useNavigation } from '@react-navigation/native';
import React, { memo, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button, View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from './UserRow';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountStackNavigation, HomeStackNavigation } from '../../types';
import AnimatedHeartButton from './AnimatedLike';
import ImageCarousel from './ImageCarousel';
import customFetch from '../../HelperFunctions/request';
import { useAuth } from '../../Context/UserContext';
import { useFetch, useUser } from '../../HelperFunctions/dataHook';
import useSWR from 'swr';
import { API_URL } from '../../Context/Vars';
import InteractionBar from './InteractionBar';

const testUser = {id: '1', name: 'John Doe', username: 'jdoe4'}

type Post = {
    id: number;
    poster_id: number;
    course_id: number; // For clicking if wanting to add map function screen
    course_name: string;
    like_count: number;
    title: string;
    caption: string;
    ratio: string;
    likes: Array<any>; // Length -> Will fetch full list when clicking to screen
    comments: Array<any>; // Length -> Will fetch full list when clicking to screen
    tags: Array<any>;
    date: any;
    score: string;
    media: Array<any>;
}

type Props = {
    post: Post;
    user: {
        user_id: string;
        name: string;
        username: string;
        profile_pic: string;
    } | undefined;
}

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

const Post = memo(function Post({post, user}: Props) {
    
    const {user: mainUser} = useAuth();
    const {data: user2, error, isLoading: isLoading2, mutate } = useSWR(user === undefined ? [`user/${post.poster_id}`, mainUser.jwt] : null, ([url, token]) => customFetch(url, "GET", undefined, token))    
    const [dateString, setDateString] = useState("")
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackNavigation>>();
    
    
    
    useEffect(() => {
        const date = new Date()
        const yesterday = new Date()
        yesterday.setDate(date.getDate() - 1)
        const postDate = new Date(post?.date)
        let tempDate = ""
        if (date.getDate() == postDate.getDate() &&  date.getMonth() == postDate.getMonth() && date.getFullYear() == postDate.getFullYear()) {
            tempDate = `Today at ${postDate.toLocaleTimeString()}`
        } else if (yesterday.getDate() == postDate.getDate() &&  yesterday.getMonth() == postDate.getMonth() && yesterday.getFullYear() == postDate.getFullYear()) {
            tempDate = `Yesterday at ${postDate.toLocaleTimeString()}`
        } else {
            tempDate = `${months[postDate.getMonth()]} ${postDate.getDate()}, ${postDate.getFullYear()} at ${postDate.toLocaleTimeString()}`
        }
        setDateString(tempDate)
    }, [post])

    


    return (
        <View style={styles.container}>
            <UserRow user={user === undefined ? user2 : user} type='post'/>
            <Divider horizontalInset={true} />
            <View style={{flexDirection: 'row', paddingVertical: 10 }}>
                <View style={styles.titleDescBlock}>
                    <Text style={{fontSize: 16, fontWeight: '500'}}>{post?.title}</Text>
                    <Text style={{fontSize: 12}}>
                        {post?.caption}
                    </Text>
                </View>
                <View style={{marginLeft: 'auto', alignItems: 'flex-end',justifyContent: 'center', paddingRight: 10, width: '40%'}}>
                    <Pressable style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 5}}>
                        <Icon name='location' color={'#006B54'} size={15}/>
                        <Text style={{fontSize: 11}}>{post?.course_name}</Text>
                    </Pressable>
                    <Text style={{fontSize: 11}}>{dateString}</Text>
                </View>
            </View>
            <Divider horizontalInset={true} />
            <View style={styles.statsRow}>
                <Pressable style={styles.userStat} onPress={() => navigation.navigate('Score', {postId: post.id})}>
                    <Text style={{fontWeight: '600', fontSize: 14}}>Score</Text>
                    <Text style={{fontSize: 12}}>{post?.score}</Text>
                </Pressable>
                {post?.tags?.length !== 0 && 
                <Pressable style={styles.userStat} onPress={() => navigation.navigate('PlayingGroup', {tags: post?.tags})}>
                    <Text style={{fontWeight: '600', fontSize: 14}}>Played with</Text>
                    {post?.tags.map((tag, index) => 
                        <Text key={index} style={{fontSize: 12}}>{tag.user_name}</Text>
                    )}
                </Pressable>}
            </View>
            
            
            {/* ImageCarousel */}
            {post?.media.length == 0 ? <Divider horizontalInset={true} style={{marginBottom: 5}} /> : <ImageCarousel media={post?.media} ratio={Number(post?.ratio)}/>}
            
            {/* <Image style={{height: 300, width: '100%', resizeMode: 'cover', borderRadius: 2}} source={require('/Users/willstrauch/FairwayFriends/Assets/GolfCourse.png')} /> */}
            <InteractionBar postId={post?.id} likeCount={post?.like_count} commentCount={post?.comments.length} navigation={navigation}/>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    userStat: {
        alignItems: 'center',
        width: '33%',
        padding: 5,
    },
    titleDescBlock: {
        paddingLeft: 10,
        width: '55%'
    }
})

export {Post};