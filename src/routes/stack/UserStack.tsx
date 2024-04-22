import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginWithContext from '../../screens/User/Login';
import Create from '../../screens/User/Create';
import MyStackNavigator from './navigator';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <MyStackNavigator
    >
      <Stack.Screen name="Login" component={LoginWithContext} />
      <Stack.Screen name="SignUp" component={Create} options={{ title: 'Sign Up' }} />
    </MyStackNavigator>
  );
}