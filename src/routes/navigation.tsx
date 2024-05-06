import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import NotAuthStack from './stack/NotAuthStack';

import AppTabs from './tab/AppTab';

import useAuth from '../context/hooks/use-auth.hook';

const Stack = createStackNavigator();

export default function Navigation() {
  const { authState } = useAuth();
  const { authenticated } = authState;

  return (
    <NavigationContainer>
      {authenticated ? (
        <AppTabs />
      ) : (
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false 
          }}
          initialRouteName={'NotAuthStack'}
        >
          <Stack.Screen name="NotAuthStack" component={NotAuthStack}/>
          <Stack.Screen name="AppTabs" component={AppTabs}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}