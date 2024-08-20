import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import SearchGame from '../../screens/Search/SearchGame';
import PublicProfile from '../../screens/User/PublicProfile';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <MyStackNavigator>
        <Stack.Screen name="SearchGame" component={SearchGame} options={{ headerTitle: ''}}/> 
        <Stack.Screen name="PublicProfile" component={PublicProfile} options={{ headerTitle: ''}}/>
    </MyStackNavigator>
  );
}
