import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAllGames from '../../screens/Games/ListAll';
import MyStackNavigator from './navigator';

const Stack = createStackNavigator();

export default function GamesStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="ListAllGames" component={ListAllGames} options={{ headerTitle: ''}}/>
    </MyStackNavigator>
  );
}
