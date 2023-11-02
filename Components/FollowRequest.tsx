import React, { useEffect } from 'react';
import { View } from 'react-native';
import useSWR from 'swr';
import { useAuth } from '../Context/UserContext';
import { API_URL } from '../Context/Vars';
import { useFetch, useUser } from '../HelperFunctions/dataHook';
import { Button } from './Button';
import { UserRow } from './PostComponents/UserRow';

type props = {
    sourceId: number;
}

const FollowRequest = ({sourceId}: props) => {
    const {user} = useAuth()
    const {isLoading, data, mutate} = useSWR(`https://${API_URL}/user/relationship/` + Number(sourceId))


    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
           <UserRow user={data} type='followrequest'/>
           <View style={{flexDirection: 'row', marginLeft: 'auto', marginRight: 5}}>
               <Button text='Confirm' onPress={() => mutate()} type="" style={{transform: "scale(0.9)"}}></Button>
               <Button text='Delete' onPress={() => undefined} type="cancel" style={{transform: "scale(0.9)"}}></Button>
           </View>
        </View>
    );
};

export default FollowRequest;