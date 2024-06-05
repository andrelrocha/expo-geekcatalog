import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAllGames from '../../screens/Games/ListAll';
import ListGameById from '../../screens/Games/ListById';
import MyStackNavigator from './navigator';

const Stack = createStackNavigator();

export default function GamesStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="ListAllGames" component={ListAllGames} options={{ headerTitle: ''}}/>
      <Stack.Screen name="ListGameById" component={ListGameById} options={{ headerTitle: ''}}/>
    </MyStackNavigator>
  );
}
