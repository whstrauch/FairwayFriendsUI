import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Pressable, SafeAreaView, ScrollView, TextInput, View } from 'react-native';
import { Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { LearnMoreLinks } from 'react-native/Libraries/NewAppScreen';
import { Comment } from '../../Components/PostComponents/Comment';
import { HomeStackNavigation } from '../../types';

// const comments = [
//     {id: "1", name: "John Doe", body: "First comment", timestamp: '4h'},
//     {id: "2", name: "Jane Doe", body: "Second comment. This is a longer comment. Hopefully this extends across multiple lines. We will see thou.", timestamp: '7h'},
//     {id: "3", name: "Johnny Doe", body: "Third comment", timestamp: '4m'},
//     {id: "4", name: "Janey Doe", body: "Fourth comment", timestamp: '7m'}
// ]

type Props = NativeStackScreenProps<HomeStackNavigation, 'Comments'>

const Comments = ({route}: Props) => {
    const [userComment, setUserComment] = useState<string>("");
    const textRef = useRef<TextInput>(null);

    // Get list of comments and display
    useEffect(() => {
        if (route.params.inputFocused) {
            textRef.current?.focus()
        }
    }, [])
    


    return (
        <SafeAreaView>
            <KeyboardAvoidingView style={{height: '100%'}} behavior='padding'>
                <FlatList
                    style={{marginBottom: 'auto'}}
                    data={[]}
                    renderItem={({item}) => <Comment comment={item}/>}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={() => <Divider horizontalInset={true}/>}
                />
                <View style={{flexDirection:'row', paddingVertical: 5, backgroundColor: 'white', alignItems: 'flex-end', borderTopWidth: 0.2,  borderColor: 'rgb(209, 209, 214)'}}>
                    <Icon name='person-circle' size={40} />
                    <TextInput 
                        ref={textRef}
                        multiline
                        numberOfLines={1}
                        style={{width: '75%', alignSelf: 'center'}} 
                        placeholder='Add comment' 
                        value={userComment} 
                        onChangeText={setUserComment}
                    />
                    <Pressable style={{marginLeft: 'auto', paddingRight: 5, paddingBottom: 5}}>
                        <Icon name="ios-arrow-forward-circle-outline" size={30} style={{}}/>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export { Comments };