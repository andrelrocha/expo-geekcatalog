import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import LoginWithContext from '../../screens/User/Login';
import Create from '../../screens/User/Create';
import Home from '../../screens/Home';

const Stack = createStackNavigator();

export default function NotAuthStack() {
  return (
    <MyStackNavigator
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} 
                    options={{ headerTitle: 'Home', headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginWithContext} />
      <Stack.Screen name="SignUp" component={Create} options={{ title: 'Sign Up' }} />
    </MyStackNavigator>
  );
}