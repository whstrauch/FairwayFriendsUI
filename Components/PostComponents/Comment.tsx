import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Button, Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useSWR from 'swr';
import { API_URL } from '../../Context/Vars';
import { CommentType } from '../../types';

const Comment = ({ comment, user }: {comment: CommentType, user: any}) => {
    const navigation = useNavigation();
    const {isLoading, data: profPic} = useSWR(() => `https://${API_URL}/user/profile_pic/` + user?.profile_pic, fetch)
    // Data needed: ProfPic, FirstName/LastName, created_at, comment

    const timestampFormat = (timestamp: string) => {
        const time = new Date(timestamp)
        const currTime = new Date()
        const diff = currTime.getTime() - time.getTime()
        if (diff < 60 * 60000) {
            return `${Math.floor(diff / 60000)}m`
        } else if (diff < 60 * 24 * 60000) {
            return `${Math.floor(diff / (60 * 60000))}h`
        } else if (diff < 60 * 24 * 60000 * 7) {
            return `${Math.floor(diff / (60 * 24 * 60000))}d`
        } else if (diff < 60 * 24 * 60000 * 7 * 52) {
            return `${Math.floor(diff / (60 * 24 * 60000 * 7))}w`
        } else {
            return `${Math.floor(diff / (60 * 24 * 60000 * 7 * 52))}y`
        }
        
    }

    return (
        <View style={{flexDirection: 'row', width: '75%', paddingVertical: 5}}>
            {profPic === undefined ? <Icon size={30} name='person-circle'/> : <Image source={profPic} width={100} height={100} style={{width: 40, height: 40, borderRadius: 20, borderWidth: 1, borderColor: '#f0f0f0'}}/>}
            <View>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', marginLeft:5}}>
                    <Text style={{fontWeight: '600'}}>{user?.name}</Text>
                    <Text style={{marginHorizontal: 2}}>{'\u00B7'}</Text>
                    <Text style={{fontWeight: '200', fontSize: 10, alignSelf: 'center'}}>{timestampFormat(comment?.timestamp)}</Text>
                </View>
                <Text style={{marginLeft: 5}}>{comment?.comment}</Text>
            </View>
        </View>
        

        
    );
};

export {Comment};