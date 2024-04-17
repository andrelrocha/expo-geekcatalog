import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAllGames from '../../screens/Games/ListAll';

const Stack = createStackNavigator();

export default function GamesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListAllGames" component={ListAllGames} />
    </Stack.Navigator>
  );
}
