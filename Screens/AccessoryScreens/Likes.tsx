import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from '../../Components/PostComponents/UserRow';

const Likes = () => {
    // Fetch list of likes -> should have user information. User_id, user name, timestamp, is follow


    // const likes = [
    //     {id: '1', user_id: '1', name: 'John Doe', username: 'jdoe4', timestamp: '4h', is_following: true},
    //     {id: '2', user_id: '2', name: 'Jane Doe',username: 'jdoe4', timestamp: '4h', is_following: false},
    //     {id: '3', user_id: '3', name: 'Donald Doe', username: 'jdoe4', timestamp: '4h', is_following: false},
    //     {id: '4', user_id: '4', name: 'Mike Doe', username: 'jdoe4', timestamp: '4h', is_following: true}
    // ]

    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                data={[]}
                renderItem={({item}) => <UserRow type='like' user={{id: item.user_id, name: item.name, username: item.username}} is_following={item.is_following} timestamp={item.timestamp}/>}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />
        </SafeAreaView>
    );
};

export default Likes;