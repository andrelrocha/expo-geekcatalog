import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import ListAllListsApp from '../../screens/ListsApp/ListAll';
import CreateListGame from '../../screens/ListsApp/Create';

const Stack = createStackNavigator();

export default function ListsAppStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="ListAllListsApp" component={ListAllListsApp} options={{ headerTitle: 'Game Lists'}}/>
      <Stack.Screen name="CreateListGame" component={CreateListGame} options={{ headerTitle: 'Create a List'}}/>
    </MyStackNavigator>
  );
}
