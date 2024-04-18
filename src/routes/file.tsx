
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Create from '../screens/User/Create';
import Login from '../screens/User/Login';
import LoginWithContext from '../screens/User/Login';
import UserStack from './stack/UserStack';
import GamesStack from './stack/GameStack';
import Header from '../components/header';
import Home from '../screens/Home';
import ListAllGames from '../screens/Games/ListAll';
import AuthContext from '../context/auth.context';

const Stack = createStackNavigator();

export default function Navigation() {
    const { authState, logout } = useContext(AuthContext);

    return (
      <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{ header: () => <Header /> }}
              
          >
            {
                authState?.authenticated ? (
                    <Stack.Screen name="ListAllGames" component={ListAllGames} />
                ) : (    
                    <Stack.Screen name="Login" component={Login} />
                )
            }
              
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  