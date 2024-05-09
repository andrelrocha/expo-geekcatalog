import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import HomeAdmin from '../../screens/Admin/Home';
import CreateGame from '../../screens/Admin/CreateGame';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <MyStackNavigator>
        <Stack.Screen name="Home" component={HomeAdmin} options={{ headerTitle: 'Home - Admin'}}/>
        <Stack.Screen name="CreateGame" component={CreateGame} options={{ headerTitle: 'Create Game'}}/>
    </MyStackNavigator>
  );
}
