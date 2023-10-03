import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from '../../Components/PostComponents/UserRow';

const Tagged = () => {
    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                data={null}
                renderItem={({item}) => <UserRow type='like' user={{user_id: item.user_id, name: item.name, username: item.username, profile_pic: item.prof_pic}} is_following={item.is_following} timestamp={item.timestamp}/>}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />
        </SafeAreaView>
    );
};

export default Tagged;