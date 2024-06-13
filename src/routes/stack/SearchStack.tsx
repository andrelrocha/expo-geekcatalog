import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import SearchGame from '../../screens/Search/SearchGame';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <MyStackNavigator>
        <Stack.Screen name="SearchGame" component={SearchGame} options={{ headerTitle: ''}}/> 
    </MyStackNavigator>
  );
}
