import { useScrollToTop } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import CustomHeader from '../../Components/CustomHeader';
import { Post } from '../../Components/PostComponents/Post';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';
import { HomeStackNavigation } from '../../types';

type Props = NativeStackScreenProps<HomeStackNavigation, "Home">

const Home = ({navigation}: Props) => {
    const {user} = useAuth()
    const ref = React.useRef(null);
    useScrollToTop(ref)
    const [refreshing, setRefreshing] = useState(false)
    // Retrieve news feed, list of posts, what info in the posts: Username, user_id, profile photo, title, description,
    // golf club, time player, score (par relation score), playing partner ids and names, Achievments, likes, comments
    // 
    // Write hook that interacts with newsfeed service to retrieve newsfeed for user (based on following)
    const {isLoading: feedLoading, data: posts, mutate: postsMutate} = useFetch(`newsfeed/${user.user_id}`, "GET", undefined, user.jwt)


    const refresh = () => {
        setRefreshing(true);
        postsMutate()
        setRefreshing(false)
    }
    return (
        <SafeAreaView>
            <FlatList 
                ref={ref}
                style={{height: '100%'}}
                data={posts}
                refreshing={refreshing}
                onRefresh={() => refresh()}
                renderItem={({item, index}) => <Post post={item} user={undefined} key={index}/>}
                ItemSeparatorComponent={()=> <View style={{height: 15}}/>}
            >
            </FlatList>
        </SafeAreaView>
    );
};

export { Home };