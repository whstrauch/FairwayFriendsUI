import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { FindStackNavigation } from '../../types';
import { Account } from '../Account/Account';
import FollowingList from '../Account/FollowingList';
import { Find } from './Find';

const Stack = createNativeStackNavigator<FindStackNavigation>()

const FindStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}>
            <Stack.Screen name="Find" component={Find} options={{headerTransparent: false}}/>
            <Stack.Screen name="Profile" component={Account} />
            <Stack.Screen name="FollowingList" component={FollowingList} options={{title: ''}}/>
        </Stack.Navigator>
    );
};

export default FindStack;