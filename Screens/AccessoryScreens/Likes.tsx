import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
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
 
    console.log("USERLIST", data)
    return (
        <SafeAreaView style={{height: '100%'}}>
            <FlatList
                data={Object.values(data)}
                renderItem={({item}) => <UserRow type='like' user={item} />}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />
        </SafeAreaView>
    );
};

export default Likes;