import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NotAuthStack from './stack/NotAuthStack';

import AuthTabs from './tab/AuthTab';

import useAuth from '../context/hooks/use-auth.hook';

const Stack = createStackNavigator();

export default function Navigation() {
  const { authState } = useAuth();
  const { authenticated } = authState;

  return (  
    <NavigationContainer>
      {authenticated ? (
        <AuthTabs />
      ) : (
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false 
          }}
          initialRouteName={'NotAuthStack'}
        >
          <Stack.Screen name="NotAuthStack" component={NotAuthStack}/>
          <Stack.Screen name="AuthTabs" component={AuthTabs}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}