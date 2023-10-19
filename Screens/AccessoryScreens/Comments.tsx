import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import { Comment } from '../../Components/PostComponents/Comment';
import { useAuth } from '../../Context/UserContext';
import { useFetch } from '../../HelperFunctions/dataHook';
import customFetch from '../../HelperFunctions/request';
import { HomeStackNavigation } from '../../types';

const comments = [
    {id: "1", name: "John Doe", body: "First comment", timestamp: '4h'},
    {id: "2", name: "Jane Doe", body: "Second comment. This is a longer comment. Hopefully this extends across multiple lines. We will see thou.", timestamp: '7h'},
    {id: "3", name: "Johnny Doe", body: "Third comment", timestamp: '4m'},
    {id: "4", name: "Janey Doe", body: "Fourth comment", timestamp: '7m'}
]

type Props = NativeStackScreenProps<HomeStackNavigation, 'Comments'>


const Comments = ({route}: Props) => {
    const {user: mainUser} = useAuth()
    const [userComment, setUserComment] = useState<string>("");
    const textRef = useRef<TextInput>(null);
    const [comments, setComments] = useState<Array<any>>([])
    const {isLoading: isLoading2, data: otherComments, mutate} = useFetch(`post/comments/${route?.params?.postId}`, "GET", undefined, mainUser.jwt)
    const users = otherComments?.map((x: any) => x.user_id)
    const {isLoading, data} = useFetch("user/users", "POST", {"users": users}, mainUser.jwt)


    // Get list of comments and display
    useEffect(() => {
        if (route.params.inputFocused) {
            textRef.current?.focus()
        }
    }, [route.params])

    const comment = () => {
        const data = {
            user_id: mainUser.user_id,
            post_id: route.params.postId,
            comment: userComment
        }

        customFetch("post/comment", "POST", data, mainUser.jwt).then(res => {
            mutate()
        }).catch(err =>
            console.log(err)
        )
    }
    


    return (
        <SafeAreaView>
            <KeyboardAvoidingView style={{height: '100%'}} behavior='padding'>
                {isLoading ? <View><ActivityIndicator/></View> : <FlatList
                    style={{marginBottom: 'auto'}}
                    data={otherComments}
                    extraData={data}
                    renderItem={({item, index}) => <Comment comment={item} user={data[item.user_id]} key={item.comment_id}/>}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
                />}
                <View style={{flexDirection:'row', paddingVertical: 5, paddingLeft: 5, backgroundColor: 'white', alignItems: 'flex-end', borderTopWidth: 0.2,  borderColor: 'rgb(209, 209, 214)'}}>
                    {/* <Icon name='person-circle' size={40} /> */}
                    <TextInput 
                        ref={textRef}
                        multiline
                        numberOfLines={1}
                        style={{width: '75%', alignSelf: 'center'}}
                        placeholder='Add a comment' 
                        value={userComment} 
                        onChangeText={setUserComment}
                    />
                    <Pressable style={styles.submit} onPress={() => comment()}>
                        {({pressed}) => <Icon name="ios-arrow-forward-circle" size={30} color={pressed ? "#66a698" : "#006B54"} />}
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    submit: {
        marginLeft: 'auto',
        marginRight: 5
    }
})

export { Comments };