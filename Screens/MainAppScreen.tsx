import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { MainTabNavigation } from '../types';
import { HomeStack } from './Home/HomeStack';
import PlayStack from './Play/PlayStack';
import ClubStack from './Clubs/ClubStack';
import AccountStack from './Account/AccountStack';
import FindStack from './Find/FindStack';

const Tab = createBottomTabNavigator<MainTabNavigation>();

const MainAppScreen = () => {
    return (
        <Tab.Navigator 
          id='Tabs'
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              const icons = {
                "HomeStack": 'ios-home',
                'FindStack': 'ios-search',
                'PlayStack': 'ios-golf',
                'ClubStack': 'ios-apps',
                'AccountStack': 'ios-person'
              };
        
              return (
                <Icon
                  name={icons[route.name]}
                  color={color}
                  size={size}
                />
              );
            },
            headerShown: false,
            tabBarActiveTintColor: '#006B54',
          })}>
            <Tab.Screen name='HomeStack' component={HomeStack} options={{tabBarLabel: 'Home'}}/>
            <Tab.Screen name='PlayStack' component={PlayStack} options={{tabBarLabel: 'Play'}}/>
            <Tab.Screen name="FindStack" component={FindStack} options={{tabBarLabel: 'Find'}}/>
            {/* <Tab.Screen name='ClubStack' component={ClubStack} options={{tabBarLabel: 'Clubs'}}/> */}
            <Tab.Screen name="AccountStack" component={AccountStack} options={{tabBarLabel: 'Profile'}}/>
        </Tab.Navigator>
    );
};

export { MainAppScreen };


