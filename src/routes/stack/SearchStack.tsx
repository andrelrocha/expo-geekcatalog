import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import SearchWikipedia from '../../screens/Search/SearchWiki';

const Stack = createStackNavigator();

export default function SearchStack() {
  return (
    <MyStackNavigator>
        <Stack.Screen name="SearchWikipedia" component={SearchWikipedia} /> 
    </MyStackNavigator>
  );
}
