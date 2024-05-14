import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import HomeAdmin from '../../screens/Admin/Home';
import CreateGame from '../../screens/Admin/CreateGame';
import CreateStudio from '../../screens/Admin/CreateStudio';
import GameInfo from '../../screens/Admin/GameInfo';
import ListAllGamesAdmin from '../../screens/Admin/ListGamesAdmin';

import FaceIDAuthentication from '../../screens/FaceId';

const Stack = createStackNavigator();

export default function AdminStack() {
  return (
    <MyStackNavigator>
        <Stack.Screen name="Home" component={HomeAdmin} options={{ headerTitle: 'Home - Admin'}}/>
        <Stack.Screen name="CreateGame" component={CreateGame} options={{ headerTitle: 'Create Game'}}/>
        <Stack.Screen name="CreateStudio" component={CreateStudio} options={{ headerTitle: 'Create Studio'}}/>
        <Stack.Screen name="ListGamesAdmin" component={ListAllGamesAdmin} options={{ headerTitle: 'Games - Admin'}}/>
        <Stack.Screen name="GameInfo" component={GameInfo} options={{ headerTitle: 'Game Info'}}/>
        <Stack.Screen name="FaceIDAuthentication" component={FaceIDAuthentication} options={{ headerTitle: 'Face ID Authentication'}}/>
    </MyStackNavigator>
  );
}
