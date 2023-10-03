import React, {useContext, useEffect, useState} from "react";
import { View, Text, Modal, StyleSheet, TextInput, TouchableOpacity, TouchableHighlight, ScrollView, SafeAreaView, Keyboard, FlatList } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigationState, useRoute, useScrollToTop } from "@react-navigation/native";
import { Post } from "../../Components/PostComponents/Post";
import { Divider } from "react-native-paper";
import AccountHeader from "../../Components/AccountHeader";
import customFetch from "../../HelperFunctions/request";
import { useAuth } from "../../Context/UserContext";
import { useFetch, useUser } from "../../HelperFunctions/dataHook";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AccountStackNavigation, HomeStackNavigation } from "../../types";
import Loading from "../../Components/Loading";
import useSWR from "swr";

type Props = NativeStackScreenProps<AccountStackNavigation | HomeStackNavigation, 'Profile'>

const Account = ({route, navigation} : Props) => {
    // IF it is account page for main user vs account page for other user should determine
    const {user} = useAuth();
    const ref = React.useRef(null);
    useScrollToTop(ref);
    const [refreshing, setRefreshing] = useState(false)
    const id = route.params?.user_id || user.user_id
    const { isLoading, error, user: fetchedUser, mutate } = useUser(id, user.jwt)
    // const { isLoading: isLoading2, data: isFollowing } = useSWR(() => [`/user/isfollowing/${fetchedUser.user_id}/${user.user_id}`, user.jwt] , ([url, token]) => customFetch(url, "GET", undefined, token))
    // Adjust to fetch image from blob storage. Will be much easier, just fetch from url.
    const {isLoading: profilePictureLoading, data: profPic} = useSWR(() => "http://localhost:5000/user/profile_pic/" + fetchedUser.profile_pic, fetch)
    const {isLoading: feedLoading, data: posts, mutate: userPostsMutate} = useFetch(`post/user/${id}`, "GET", undefined, user.jwt)
    const [status, setStatus] = useState("new")


    useEffect(() => {
        
        if (fetchedUser !== undefined) {
            console.log(fetchedUser, user.user_id)
            customFetch(`user/isfollowing/${fetchedUser.user_id}/${user.user_id}`, "GET", undefined, user.jwt).then(res =>
                setStatus(res.status)
            )
        }
    }, [fetchedUser])


    const refresh = () => {
        setRefreshing(true);
        console.log("REFRESH", profPic);
        mutate()
        userPostsMutate()
        setRefreshing(false)
    }

    return(
        <SafeAreaView style={styles.container}>
            {isLoading || profilePictureLoading ?  <Loading /> :
            <FlatList 
                ref={ref}
                data={posts}
                renderItem={({item, index}) => <Post post={item} user={fetchedUser} key={index}/>}
                refreshing={refreshing}
                onRefresh={() => refresh()}
                ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                ListHeaderComponent={<AccountHeader user={fetchedUser} mainUser={user} isMain={id == user.user_id} isFollowing={status} profPic={profPic}/>}
                ListFooterComponent={posts?.length === 0 ? 
                    <View style={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
                        {id == user.user_id ? <Text>Create your first post in the Play tab</Text> : <Text>No posts yet.</Text>}
                    </View> : null}
            />  }
            
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    
})

export {Account};