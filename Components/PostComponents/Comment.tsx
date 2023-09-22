import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {Button, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CommentType } from '../../types';

const Comment = ({ comment }: CommentType) => {
    const navigation = useNavigation();

    // Data needed: ProfPic, FirstName/LastName, created_at, comment

    return (
        <View style={{flexDirection: 'row', width: '75%', paddingVertical: 5}}>
            <Icon name='person-circle' size={40}/>
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: '600'}}>{comment.name}</Text>
                    <Text> {'\u00B7'} </Text>
                    <Text style={{fontWeight: '200'}}>{comment.timestamp}</Text>
                </View>
                <Text>{comment.body}</Text>
            </View>
        </View>
        

        
    );
};

export {Comment};