import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { PlayStackNavigation } from '../../types';
import { Play } from './Play';
import {PostRound} from './PostRound';
import { Scorekeeping } from './Scorekeeping';
// import { FindCourse } from './DepracatedFindCourse';
import SetUpRound from './SetUpRound';
import { ScoreProvider } from '../../Context/ScoreContext';

const Stack = createNativeStackNavigator<PlayStackNavigation>()

const PlayStack = () => {
    return (

        <ScoreProvider>
            <Stack.Navigator screenOptions={{headerBackTitleVisible: false ,headerTransparent: true, headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}>
                <Stack.Screen name="Play" component={Play} options={{headerTransparent: true, headerTitleStyle: {color: 'white'}}}/>
                {/* <Stack.Screen name="FindCourse" component={FindCourse} options={{title: 'Select Course'}} /> */}
                <Stack.Screen name='PostRound' component={PostRound} options={{title: 'Post'}}/>
                <Stack.Screen name="Scorekeeping" component={Scorekeeping} options={{title: ''}}/>
                <Stack.Screen name="SetUpRound" component={SetUpRound} options={{title: ''}}/>
            </Stack.Navigator>
        </ScoreProvider>
    );
};

export default PlayStack;