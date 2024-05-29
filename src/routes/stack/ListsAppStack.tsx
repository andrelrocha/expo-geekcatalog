import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import ListAllListsApp from '../../screens/ListsApp/ListAll';
import CreateListGame from '../../screens/ListsApp/Create';
import UpdateListGame from '../../screens/ListsApp/Update';
import ListGamesList from '../../screens/ListsApp/ListGame';

const Stack = createStackNavigator();

export default function ListsAppStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="ListAllListsApp" component={ListAllListsApp} options={{ headerTitle: 'Game Lists'}}/>
      <Stack.Screen name="CreateListGame" component={CreateListGame} options={{ headerTitle: 'Create a List'}}/>
      <Stack.Screen name="UpdateListGame" component={UpdateListGame} options={{ headerTitle: 'Update a List'}}/>
      <Stack.Screen name="ListGamesList" component={ListGamesList} options={{ headerTitle: 'List Games'}}/>
    </MyStackNavigator>
  );
}
