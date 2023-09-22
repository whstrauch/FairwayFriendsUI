/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Pressable,
  StyleSheet,
} from 'react-native';

import { Login } from './Screens/Login/Login';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CreateAccount } from './Screens/Login/CreateAccount';
import { ForgotPassword } from './Screens/Login/ForgotPassword';
import { LoginNavigation } from './types';
import { DefaultTheme, PaperProvider } from 'react-native-paper';
import { MainAppScreen } from './Screens/MainAppScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './Context/UserContext';
import AddUserInfo from './Screens/Login/AddUserInfo';
import Icon from 'react-native-vector-icons/Ionicons';
import { Alert } from 'react-native';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import customFetch from './HelperFunctions/request';

const Stack = createNativeStackNavigator<LoginNavigation>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    secondaryContainer: '#66a698', // Change this to your desired selected background color
  },
};

const App = () => {
  

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <UserProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerTintColor: '#006B54', headerTitleStyle: {color: 'black'}}}>
              <Stack.Screen name='Login' component={Login} options={{headerShown: false}} />
              <Stack.Screen name='SignUp' component={CreateAccount} options={{title: 'Sign Up', headerTransparent: true}}/>
              <Stack.Screen name="ResetPassword" component={ForgotPassword} options={{title: 'Reset Password', headerTransparent: true}}/>
              <Stack.Screen name="UserInfo" component={AddUserInfo} options={{title: 'Sign Up', headerTransparent: true, headerBackVisible: false}}/>
              <Stack.Screen name="MainApp" component={MainAppScreen} options={{headerShown: false}} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserProvider>
      </PaperProvider>
    </SafeAreaProvider>
    
  )
}

export default App;
