import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';
import { HomeStackNavigation } from '../../types';

type Props = NativeStackScreenProps<HomeStackNavigation, 'PlayingGroup'>

const Tagged = ({navigation, route}: Props) => {
    const {user} = useAuth()
    const users = route.params.tags.map(x => x.user_id)
    const {isLoading, data} = useFetch("user/users", "POST", {"users": users}, user.jwt)


    console.log(route.params?.tags)
    return (
        <SafeAreaView style={{height: '100%'}}>
            {isLoading ? <ActivityIndicator /> : <FlatList
                data={Object.values(data)}
                renderItem={({item}) => <UserRow user={item} type="like"/>}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />}
        </SafeAreaView>
    );
};

export default Tagged;