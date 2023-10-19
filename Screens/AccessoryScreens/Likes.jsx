import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import useSWR from 'swr';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';
import { HomeStackNavigation, UserType } from '../../types';


const Likes = ({route}) => {
    // Fetch list of likes -> should have user information. User_id, user name, timestamp, is follow
    // Post id should be able to fetch list of likes.
    const {user} = useAuth()
    // Fetch list of likes
    const {isLoading: isLoading2, data: likes} = useFetch(`likes/${route?.params?.postId}`, "GET", undefined, user.jwt)
    const users = likes?.map(like => like.user_id)
    const {isLoading, data} = useFetch("user/users", "POST", {"users": users}, user.jwt)
    
    return (
        <SafeAreaView style={{height: '100%'}}>
            {isLoading || isLoading2 ? <ActivityIndicator/> : <FlatList
                data={Object.values(data)}
                renderItem={({item}) => <UserRow type='like' user={item} />}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />}
            <Text>{route.params?.postId}</Text>
        </SafeAreaView>
    );
};

export default Likes;