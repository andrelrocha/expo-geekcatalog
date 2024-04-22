import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginWithContext from '../../screens/User/Login';
import Create from '../../screens/User/Create';

const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginWithContext} />
      <Stack.Screen name="SignUp" component={Create} />
    </Stack.Navigator>
  );
}