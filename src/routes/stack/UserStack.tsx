import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import ListUser from '../../screens/User/ListUser';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="HomeUserInfo" component={ListUser} options={{ 
        headerTitle: 'User Info',
        headerLeft: () => null,
        gestureEnabled: false,
      }}/>
    </MyStackNavigator>
  );
}
