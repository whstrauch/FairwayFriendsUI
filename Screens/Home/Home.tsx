import { useScrollToTop } from '@react-navigation/native';
import React from 'react';
import { FlatList, SafeAreaView, ScrollView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { Post } from '../../Components/PostComponents/Post';

const Home = () => {
    const ref = React.useRef(null);
    useScrollToTop(ref)
    // Retrieve news feed, list of posts, what info in the posts: Username, user_id, profile photo, title, description,
    // golf club, time player, score (par relation score), playing partner ids and names, Achievments, likes, comments
    // 
    // Write hook that interacts with newsfeed service to retrieve newsfeed for user (based on following)
    const data = [1,2,3]

    return (
        <SafeAreaView>
            <FlatList 
                ref={ref}
                style={{height: '100%'}}
                data={data}
                renderItem={({item}) => 
                    <Post />
                }
                ItemSeparatorComponent={()=> <View style={{height: 15}}/>}
            >
            </FlatList>
        </SafeAreaView>
    );
};

export { Home };