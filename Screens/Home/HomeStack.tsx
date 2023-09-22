import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { HomeStackNavigation, MainTabNavigation } from '../../types';
import { Comments } from '../AccessoryScreens/Comments';
import Likes from '../AccessoryScreens/Likes';
import Tagged from '../AccessoryScreens/Tagged';
import { Account } from '../Account/Account';
import Notifications from '../Notifications';
import { Home } from './Home';

const Stack = createNativeStackNavigator<HomeStackNavigation>();

const HomeStack = () => {

    const navigation = useNavigation<NativeStackNavigationProp<HomeStackNavigation>>()

    return (
        <Stack.Navigator screenOptions={{headerBackTitleVisible: false, headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}>
            <Stack.Screen 
                name="Home" 
                component={Home} 
                options={{title: "Feed", headerTransparent: false, 
                    headerRight: () => (
                        <Icon
                            name="ios-notifications-outline"
                            size={22}
                            onPress={() => navigation.navigate("Notification2")}
                        />
          )}}/>
            <Stack.Screen name="Comments" component={Comments} options={{headerTransparent: true}}/>
            <Stack.Screen name="Likes" component={Likes} options={{headerTransparent: true}} />
            <Stack.Screen name="PlayingGroup" component={Tagged} options={{headerTransparent: true, title: "Playing Group"}} />
            <Stack.Screen name="Notification2" component={Notifications} options={{title: "Notifications"}}/>
            <Stack.Screen name="Profile" component={Account} />
        </Stack.Navigator>
    );
};

export {HomeStack};