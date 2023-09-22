import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';
import { AccountStackNavigation } from '../../types';

type Props = NativeStackScreenProps<AccountStackNavigation, 'FollowingList'>

const FollowingList = ({navigation, route}: Props) => {
    const {user} = useAuth()
    // Fetch user following list, must have name, user id, is following
    // Pass to flatlist
    // Depending on type fetch followers or following list, then set to state;
    const url = `user/${route.params.type.toLowerCase()}/${route.params.user_id}/${user.user_id}`
    const {isLoading, error, data} = useFetch(url, "GET", undefined, user.jwt)


    useEffect(() => {
        navigation.setOptions({
          title: route.params.type
        });
      }, [navigation, route.params.type]);

    // const users = [{name: 'Mike', username: 'Mikey', id: '1', is_following: true}]

    return (
        <SafeAreaView style={{height: '100%'}}>
            {isLoading ? <Text>Loading...</Text> :
            <FlatList
                data={data}
                renderItem={({item}) => {
                    if (item.status == "accepted") {
                        return <UserRow user={item} type='list'/>
                    } else {
                        return null
                    }
                }}
                ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
            />}
        </SafeAreaView>
    );
};

export default FollowingList;