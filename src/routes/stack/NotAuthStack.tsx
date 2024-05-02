import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MyStackNavigator from './navigator';
import Login from '../../screens/User/Login';
import Create from '../../screens/User/Create';
import ForgotPassword from '../../screens/User/ForgotPassword';
import ResetPassword from '../../screens/User/ResetPassword';
import Home from '../../screens/Home';

const Stack = createStackNavigator();

export default function NotAuthStack() {
  return (
    <MyStackNavigator
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Home} 
                    options={{ headerTitle: 'Home', headerShown: false }}
      />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={Create} options={{ title: 'Sign Up' }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ title: 'Reset Password' }} />
    </MyStackNavigator>
  );
}