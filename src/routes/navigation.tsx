import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginWithContext from '../screens/User/Login';
import { Header } from '../components';
import Home from '../screens/Home';

import UserStack from './stack/UserStack';
import GamesStack from './stack/GameStack';
import ListAllGames from '../screens/Games/ListAll';

const Stack = createStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{ 
                    headerShown: false 
               }}
              initialRouteName='Home'
          >
            <Stack.Screen name="Home" component={Home} 
                options={{ headerTitle: 'Home', headerShown: false }}
            />
            <Stack.Screen name="UserStack" component={UserStack}/>
              
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  