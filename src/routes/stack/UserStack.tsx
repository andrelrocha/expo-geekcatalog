import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import UserHome from '../../screens/User/UserHome';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="HomeUserInfo" component={UserHome} options={{ 
        headerTitle: 'User Info',
        headerLeft: () => null,
        gestureEnabled: false,
      }}/>
    </MyStackNavigator>
  );
}
