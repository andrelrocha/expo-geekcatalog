import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

import UserStack from './stack/UserStack';
import GamesStack from './stack/GameStack';

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
  