import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Create from '../screens/User/Create';
import UserStack from './stack/UserStack';
import GamesStack from './stack/GameStack';
import Header from '../components/header';
import Home from '../screens/Home';
import ListAllGames from '../screens/Games/ListAll';

import Login from '../screens/User/Login';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{ header: () => <Header /> }}
              initialRouteName='Create'
          >
              <Stack.Screen name="Create" component={Create} />
              
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  