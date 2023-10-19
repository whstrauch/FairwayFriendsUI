import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationRow from '../../Components/NotificationRow';
import { useAuth } from '../../Context/UserContext';
import { useFetch, useUser } from '../../HelperFunctions/dataHook';
import customFetch from '../../HelperFunctions/request';
import { HomeStackNavigation } from '../../types';

type Props = NativeStackScreenProps<HomeStackNavigation, "Notifications">

const notis = [1, 2, 3, 4]

const Notifications = ({navigation}: Props) => {
    const {user} = useAuth()
    const {isLoading, data} = useFetch(`notifications/${user.user_id}`, "GET", undefined, user.jwt)


    //useEffect to filter notifications?


    // Fetch follow requests and other notifications, if main user is public lump all
    // together. Otherwise have follow requests section.
    return (
        <View style={{flex: 1}}>
            {data?.follow_requests?.length > 0 &&
                <Pressable style={({pressed}) => [styles.row, {backgroundColor: pressed ? "lightgray" : "white"}]} onPress={() => navigation.navigate("FollowRequests", {ids: data.follow_requests.map((x: { source_id: any; }) => x.source_id)})}>
                    <Icon name='people-outline' size={20} color="#006B54" />
                    <Text style={styles.text}>Follow Requests</Text>
                    <View style={styles.reqNumber}>
                        <Text style={{color: 'white', fontSize: 12, textAlign: 'center'}}>{data?.follow_requests?.length}</Text>
                    </View>
                    <Icon name="chevron-forward-outline" size={20} color="gray"/>
                </Pressable>
            }
            {data?.main_notis?.length > 0 ? 
            <FlatList 
                data={data?.main_notis}
                renderItem={({item}) => <NotificationRow item={item} navigation={navigation}/>}
            /> :
            <View style={{flex: 0.5, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                 <Text style={{fontSize: 16}}>No new notifications.</Text>
            </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    text: {
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        marginLeft: 10,
        marginRight: 'auto',
        padding: 7
    },
    reqNumber: {
        paddingHorizontal: 4,
        paddingVertical: 2,
        minWidth: 18,
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 10
    }
})

export default Notifications;