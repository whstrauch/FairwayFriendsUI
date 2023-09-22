import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ClubTabs } from './ClubTabs';

const Stack = createNativeStackNavigator()

const ClubStack = () => {
    return (
            <Stack.Navigator screenOptions={{headerBackTitleVisible: false, headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}>
                <Stack.Screen name="Clubs" component={ClubTabs} options={{headerShown: false}}/>
            </Stack.Navigator>
        
    );
};

export default ClubStack;