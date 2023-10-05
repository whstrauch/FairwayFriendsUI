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

const testUser = {id: '1', name: 'John Doe', username: 'jdoe4'}

type Post = {
    id: number;
    poster_id: number;
    course_id: number;
    course_name: string;
    title: string;
    caption: string;
    ratio: string;
    likes: Array<any>;
    comments: Array<any>;
    tags: Array<any>;
    date: any;
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
    const {isLoading, data} = useSWR(() => `http://${API_URL}:5000/like/${post.id}/${mainUser.user_id}`, fetch, {revalidateOnFocus: false})
    const {data: user2, error, isLoading: isLoading2, mutate } = useSWR(user === undefined ? [`user/${post.poster_id}`, mainUser.jwt] : null, ([url, token]) => customFetch(url, "GET", undefined, token))    
    const [dateString, setDateString] = useState("")
    const navigation = useNavigation<NativeStackNavigationProp<HomeStackNavigation>>();
    
    const [liked, setLiked] = useState<Boolean>(false);
    const [prevLiked, setPrevLiked] = useState(false);
    console.log(post)
    console.log("DATA", user)

    useEffect(() => {
        data?.json().then(res => {
            setLiked(res.is_liked)
            setPrevLiked(res.is_liked)
        })
    }, [isLoading])
    
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

    const like = () => {
        // Call database for likes
        // Should edit to return new like count
        const data = {
            "user_id": mainUser.user_id,
            "post_id": post.id
        }
        if (!liked) {
            customFetch("post/like", "POST", data, mainUser.jwt).catch(err =>
                console.log(err)
            )
        } else {
            customFetch("post/like/delete", "DELETE", data, mainUser.jwt).catch(err =>
                console.log(err)
            )
        }
        setLiked(!liked)
        // Set likes
        
    }


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
                <Pressable style={styles.userStat} onPress={() => console.log("Inner", post)}>
                    <Text style={{fontWeight: '600', fontSize: 14}}>Score</Text>
                    <Text style={{fontSize: 12}}>78 (+6)</Text>
                </Pressable>
                {post?.tags?.length !== 0 && <Pressable style={styles.userStat} onPress={() => navigation.navigate('PlayingGroup', {tags: post?.tags})}>
                    <Text style={{fontWeight: '600', fontSize: 14}}>Played with</Text>
                    {post?.tags.map((tag) => 
                        <Text style={{fontSize: 12}}>{tag.user_name}</Text>
                    )}
                </Pressable>}
                {/* <Pressable style={styles.userStat}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>Achievements</Text>
                    <Text style={{alignSelf: 'center', fontSize: 14}}>Medals</Text>
                </Pressable> */}
            </View>
            
            
            {/* ImageCarousel */}
            {post?.media.length == 0 ? <Divider horizontalInset={true} style={{marginBottom: 5}} /> : <ImageCarousel media={post?.media} ratio={Number(post?.ratio)}/>}
            
            {/* <Image style={{height: 300, width: '100%', resizeMode: 'cover', borderRadius: 2}} source={require('/Users/willstrauch/FairwayFriends/Assets/GolfCourse.png')} /> */}
            <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'}}>
                <Pressable onPress={() => navigation.navigate('Likes', {likes: post === undefined ? [] : post.likes})}>
                    <Text style={{fontSize: 12}}>
                        {/* This could use some work */}
                        {post?.likes?.length + (prevLiked ? liked ? 0 : -1 : Number(liked))} likes
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Comments', {inputFocused: false, comments: post === undefined ? [] : post.comments, postId: post.id})}>
                    <Text style={{fontSize: 12}}>
                        {post?.comments?.length} comments
                    </Text>
                </Pressable>
            </View>
            <Divider horizontalInset={true} style={{marginVertical: 5}}/>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.userInteractionBlock}>
                    <AnimatedHeartButton onPress={like} liked={liked} style={styles.userInteractionButton}/>
                    <Pressable style={styles.userInteractionButton} onPress={() => navigation.navigate("Comments", {inputFocused: true, comments: post === undefined ? [] : post.comments, postId: post.id})}>
                        <Icon name="ios-chatbubble-outline" size={25}/>
                        <Text> Comment</Text>
                    </Pressable>
                    <Pressable style={styles.userInteractionButton} onPress={() => console.log(post)}>
                        <Icon name="ios-arrow-redo-outline" size={25}/>
                        <Text> Share</Text>
                    </Pressable>
                </View>
            </View>
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
    },
    userInteractionBlock: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        marginBottom: 5
    },
    userInteractionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '33%',
        justifyContent: 'center',
    }
})

export {Post};