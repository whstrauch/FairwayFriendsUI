import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'
import {Button, View, Text, SafeAreaView, Image, Pressable} from 'react-native';
import { StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from './UserRow';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AccountStackNavigation, HomeStackNavigation } from '../../types';
import AnimatedHeartButton from './AnimatedLike';
import ImageCarousel from './ImageCarousel';

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
        id: string;
        name: string;
        username: string;
        profile_pic: string;
    }
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

const Post = ({post, user}: Props) => {
    const [liked, setLiked] = useState<Boolean>(false);
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
            <UserRow user={user} type='post'/>
            <Divider horizontalInset={true} />
            <View style={{flexDirection: 'row', paddingVertical: 10 }}>
                <View style={styles.titleDescBlock}>
                    <Text style={{fontSize: 18, fontWeight: '500'}}>{post?.title}</Text>
                    <Text>
                        {post?.caption}
                    </Text>
                </View>
                <View style={{marginLeft: 'auto', alignItems: 'flex-end',justifyContent: 'center', paddingRight: 10, width: '40%'}}>
                    <Pressable style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 8}}>
                        <Icon name='location' color={'#006B54'} size={15}/>
                        <Text style={{fontSize: 11}}>{post?.course_name}</Text>
                    </Pressable>
                    <Text style={{fontSize: 11}}>{dateString}</Text>
                </View>
            </View>
            <Divider horizontalInset={true} />
            <View style={[styles.statsRow, {justifyContent: post?.tags?.length === 0 ? 'flex-end' : 'space-around'}]}>
                <Pressable style={styles.userStat} onPress={() => console.log("Inner", post)}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>Score</Text>
                    <Text style={{fontSize: 14}}>78 (+6)</Text>
                </Pressable>
                {post?.tags?.length !== 0 && <Pressable style={styles.userStat} onPress={() => navigation.navigate('PlayingGroup')}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>Played with</Text>
                    <Text style={{fontSize: 14}}>{post?.tags}</Text>
                </Pressable>}
                {/* <Pressable style={styles.userStat}>
                    <Text style={{fontWeight: 'bold', fontSize: 14}}>Achievements</Text>
                    <Text style={{alignSelf: 'center', fontSize: 14}}>Medals</Text>
                </Pressable> */}
            </View>
            
            
            {/* ImageCarousel */}
            <ImageCarousel media={post?.media} ratio={Number(post?.ratio)}/>
            
            {/* <Image style={{height: 300, width: '100%', resizeMode: 'cover', borderRadius: 2}} source={require('/Users/willstrauch/FairwayFriends/Assets/GolfCourse.png')} /> */}
            <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'}}>
                <Pressable onPress={() => navigation.navigate('Likes')}>
                    <Text style={{fontSize: 12}}>
                        {post?.likes?.length} likes
                    </Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('Comments', {inputFocused: false})}>
                    <Text style={{fontSize: 12}}>
                        {post?.comments?.length} comments
                    </Text>
                </Pressable>
            </View>
            <Divider horizontalInset={true} style={{marginVertical: 5}}/>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.userInteractionBlock}>
                    <AnimatedHeartButton onPress={() => setLiked(!liked)} style={styles.userInteractionButton}/>
                    <Pressable style={styles.userInteractionButton} onPress={() => navigation.navigate("Comments", {inputFocused: true})}>
                        <Icon name="ios-chatbubble-outline" size={25}/>
                        <Text> Comment</Text>
                    </Pressable>
                    <Pressable style={styles.userInteractionButton} onPress={() => console.log(liked)}>
                        <Icon name="ios-arrow-redo-outline" size={25}/>
                        <Text> Share</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    userStat: {
        alignItems: 'center',
        width: '33%',
        justifyContent: 'center',
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