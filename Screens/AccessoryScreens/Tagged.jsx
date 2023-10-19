import React from 'react';
import { ActivityIndicator, FlatList, SafeAreaView } from 'react-native';
import { Divider } from 'react-native-paper';
import { UserRow } from '../../Components/PostComponents/UserRow';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';


const Tagged = ({navigation, route}) => {

    const {user} = useAuth()
    const users = route.params.tags.map(x => x.user_id)
    const {isLoading, data} = useFetch("user/users", "POST", {"users": users}, user.jwt)


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