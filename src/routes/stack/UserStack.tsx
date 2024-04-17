import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../../screens/User/Login';
import Create from '../../screens/User/Create';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Create" component={Create} />
    </Stack.Navigator>
  );
}