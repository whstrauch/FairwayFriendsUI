import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Comments } from '../AccessoryScreens/Comments';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Post } from '../../Components/PostComponents/Post';
import ClubSearch from './ClubSearch';
import {UserClubs} from './UserClubs';

const Tab = createMaterialTopTabNavigator();

const ClubTabs = () => {
    const insets = useSafeAreaInsets()

    return (
        <Tab.Navigator screenOptions={{tabBarInactiveTintColor: 'black', tabBarActiveTintColor: '#006B54', tabBarIndicatorStyle: {backgroundColor: '#006B54'}}} style={{paddingTop: insets.top, backgroundColor: 'white'}}>
                <Tab.Screen name="Find Clubs" component={ClubSearch} />
                <Tab.Screen name="Your Clubs" component={UserClubs} />
        </Tab.Navigator>
    );
};

export {ClubTabs};