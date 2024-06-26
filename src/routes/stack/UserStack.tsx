import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import UserAppData from '../../screens/User/AppData';
import UserHome from '../../screens/User/UserHome';
import UserInfo from '../../screens/User/UserInfo';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="HomeUserInfo" component={UserHome} options={{ 
        headerTitle: 'User Info',
        headerLeft: () => null,
        gestureEnabled: false,
      }}/>
      <Stack.Screen name="UserAppData" component={UserAppData} options={{
        headerTitle: 'User App Data',
      }}/>
      <Stack.Screen name="UserInfo" component={UserInfo} options={{ 
        headerTitle: 'User Info',
      }}/>
    </MyStackNavigator>
  );
}
