import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { AccountStackNavigation } from '../../types';
import { Comments } from '../AccessoryScreens/Comments';
import Likes from '../AccessoryScreens/Likes';
import Score from '../AccessoryScreens/Score';
import Tagged from '../AccessoryScreens/Tagged';
import { Account } from './Account';
import EditProfile from './EditProfile';
import FollowingList from './FollowingList';
import Settings from './Settings';

const Stack = createNativeStackNavigator<AccountStackNavigation>()

const AccountStack = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AccountStackNavigation>>()


    return (
        <Stack.Navigator 
            screenOptions={{headerBackTitleVisible: false, headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}
        >
            <Stack.Screen 
                name='Profile' 
                component={Account} 
                options={{
                    headerRight: () => (
                        <View style={{flexDirection: 'row'}}>
                            <Icon name="settings-outline" size={20} onPress={() => navigation.navigate('Settings')}/>
                            {/* <Icon name="ios-notifications-outline" size={20} onPress={() => navigation.navigate('Notifications')}/> */}
                        </View>      
            )}}/>
            <Stack.Screen name="Comments" component={Comments} options={{headerTransparent: true}}/>
            <Stack.Screen name="Likes" component={Likes} options={{headerTransparent: true}} />
            <Stack.Screen name="PlayingGroup" component={Tagged} options={{headerTransparent: true, title: "Playing Group"}} />
            {/* <Stack.Screen name="Notifications" component={Notifications} /> */}
            <Stack.Screen name="FollowingList" component={FollowingList} options={{title: ''}}/>
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="EditProfile" component={EditProfile} options={{title: "Edit Profile"}} />
            <Stack.Screen name="Score" component={Score} />
        </Stack.Navigator>
    );
};

export default AccountStack;