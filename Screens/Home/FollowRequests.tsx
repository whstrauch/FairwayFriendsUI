import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { Text } from 'react-native-paper';
import useSWR from 'swr';
import { Button } from '../../Components/Button';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useAuth } from '../../Context/UserContext';
import { API_URL } from '../../Context/Vars';
import { useFetch } from '../../HelperFunctions/dataHook';
import customFetch from '../../HelperFunctions/request';
import { HomeStackNavigation } from '../../types';

type Props = NativeStackScreenProps<HomeStackNavigation, "FollowRequests">

const FollowRequests = ({route}: Props) => {
    // Shouldnt take ids from route, just fetch pending, makes updating list easy
    const {user} = useAuth()
    const { isLoading, data, mutate } = useSWR(() => [`user/follow-requests/` + user.user_id, user.jwt], ([url, token]) => customFetch(url, "GET", undefined, token))


    const action = (type: string, index: number) => {
        const body = {
            user_id: data[index].user_id,
            followee_id: user.user_id
        }

        if (type == "del") {
            customFetch("user/unfollow", "DELETE", body, user.jwt).then(res => 
                mutate()
            ).catch(err => console.log(err))
        } else {
            customFetch(`user/accept/${data[index].relationship_id}`, "PUT", {}, user.jwt).then(res =>
                mutate()
            ).catch(err => console.log(err))
        }

    }


    const renderItem = useCallback(({item, index}: any) => (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <UserRow user={item} type='followrequest'/>
           <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 5}}>
               <Button text='Confirm' onPress={() => action("con", index)} type="" style={{transform: "scale(0.9)"}}></Button>
               <Button text='Delete' onPress={() => action("del", index)} type="cancel" style={{transform: "scale(0.9)"}}></Button>
           </View>
        </View>
    ), [])

    return (
        <View style={{flex: 1}}>
            {isLoading ? <ActivityIndicator/> : <FlatList
                data={data}
                renderItem={renderItem}
                style={{flex: 1}}
            />}
        </View>
    );
};

export default FollowRequests;