import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import { Divider } from 'react-native-paper';
import useSWR from 'swr';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';
import { HomeStackNavigation } from '../../types';

type Props = NativeStackScreenProps<HomeStackNavigation, 'Likes'>

const Likes = ({route}: Props) => {
    // Fetch list of likes -> should have user information. User_id, user name, timestamp, is follow
    const {user} = useAuth()
    const users = route.params.likes.map(x => x.user_id)
    const {isLoading, data} = useFetch("user/users", "POST", {"users": users}, user.jwt)

    // const likes = [
    //     {id: '1', user_id: '1', name: 'John Doe', username: 'jdoe4', timestamp: '4h', is_following: true},
    //     {id: '2', user_id: '2', name: 'Jane Doe',username: 'jdoe4', timestamp: '4h', is_following: false},
    //     {id: '3', user_id: '3', name: 'Donald Doe', username: 'jdoe4', timestamp: '4h', is_following: false},
    //     {id: '4', user_id: '4', name: 'Mike Doe', username: 'jdoe4', timestamp: '4h', is_following: true}
    // ]

    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                data={data}
                renderItem={({item}) => <UserRow type='like' user={item} />}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />
        </SafeAreaView>
    );
};

export default Likes;