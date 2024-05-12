import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import HomeAdmin from '../../screens/Admin/Home';
import CreateGame from '../../screens/Admin/CreateGame';
import CreateStudio from '../../screens/Admin/CreateStudio';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <MyStackNavigator>
        <Stack.Screen name="Home" component={HomeAdmin} options={{ headerTitle: 'Home - Admin'}}/>
        <Stack.Screen name="CreateGame" component={CreateGame} options={{ headerTitle: 'Create Game'}}/>
        <Stack.Screen name="CreateStudio" component={CreateStudio} options={{ headerTitle: 'Create Studio'}}/>
    </MyStackNavigator>
  );
}
