import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListAllListsApp from '../../screens/ListsApp/ListAll';
import MyStackNavigator from './navigator';

const Stack = createStackNavigator();

export default function ListsAppStack() {
  return (
    <MyStackNavigator>
      <Stack.Screen name="ListAllListsApp" component={ListAllListsApp} options={{ headerTitle: 'Game Lists'}}/>
    </MyStackNavigator>
  );
}
