import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import { useAuth } from '../../Context/UserContext';
import { API_URL } from '../../Context/Vars';
import customFetch from '../../HelperFunctions/request';
import AnimatedHeartButton from './AnimatedLike';

const InteractionBar = ({postId, likeCount, commentCount, navigation}: any ) => {

    const {user} = useAuth()
    // Fetch like and comment lengths Add new route.
    const {isLoading, data, mutate: likeMutate} = useSWR(() => `http://${API_URL}:5000/like/${postId}/${user.user_id}`, fetch)


    // Have state that is liked length and comment length. Then can update easily

    const [liked, setLiked] = useState<Boolean>(false);
    const [prevLiked, setPrevLiked] = useState<Boolean>(false);


    useEffect(() => {
        data?.json().then(res => {
            setPrevLiked(res.is_liked)
            setLiked(res.is_liked)
        }).catch(err => 
            console.log(err)
        )
    }, [isLoading])

    const like = () => {
        // Call database for likes
        // Should edit to return new like count
        // Should fetch new likes list.
        const data = {
            "user_id": user.user_id,
            "post_id": postId
        }
        setLiked(liked => !liked)
        if (!liked) {
            customFetch("post/like", "POST", data, user.jwt).then(res => {
                likeMutate()
            }).catch(err => {
                console.log("AddLike", err)
            })
        } else {
            customFetch("post/like/delete", "DELETE", data, user.jwt).then(res => {
                likeMutate()
            }).catch(err =>
                console.log("DelLike",err)
                
            )
        }
        // Set likes
        
    }

    return (
        <>
        <View style={{ flexDirection: 'row', marginHorizontal: 10, justifyContent: 'space-between'}}>
            <Pressable onPress={() => navigation.navigate('Likes', {postId: postId})}>
                <Text style={{fontSize: 12}}>
                    {/* This could use some work */}
                    {likeCount + (prevLiked ? liked ? 0 : -1 : Number(liked))} likes
                </Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Comments', {inputFocused: false, postId: postId})}>
                <Text style={{fontSize: 12}}>
                    {commentCount} comments
                </Text>
            </Pressable>
        </View>
        <Divider horizontalInset={true} style={{marginVertical: 5}}/>
        <View style={{flexDirection: 'row'}}>
            <View style={styles.userInteractionBlock}>
                <AnimatedHeartButton onPress={like} liked={liked} style={styles.userInteractionButton}/>
                <Pressable style={styles.userInteractionButton} onPress={() => navigation.navigate("Comments", {inputFocused: true, comments: [], postId: postId})}>
                    <Icon name="ios-chatbubble-outline" size={25}/>
                    <Text> Comment</Text>
                </Pressable>
                <Pressable style={styles.userInteractionButton} onPress={() => console.log("NOT POSSIBLE")}>
                    <Icon name="ios-arrow-redo-outline" size={25}/>
                    <Text> Share</Text>
                </Pressable>
            </View>
        </View>
        </>
    );
};

const styles = StyleSheet.create({
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

export default InteractionBar;