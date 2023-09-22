import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Find } from './Find';

const Stack = createNativeStackNavigator()

const FindStack = () => {
    return (
        <Stack.Navigator screenOptions={{headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}>
            <Stack.Screen name="Find" component={Find} options={{headerTransparent: false}}/>
        </Stack.Navigator>
    );
};

export default FindStack;