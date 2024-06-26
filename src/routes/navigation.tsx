import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NotAuthStack from './stack/NotAuthStack';

import AuthTab from './tab/AuthTab';

import useAuth from '../context/hooks/use-auth.hook';

const Stack = createStackNavigator();

export default function Navigation() {
  const { authState } = useAuth();
  const { authenticated } = authState;

  useEffect(() => {
    
  }, [authenticated]);

  return (  
    <NavigationContainer>
      {authenticated ? (
        <AuthTab />
      ) : (
        <Stack.Navigator 
          screenOptions={{ 
            headerShown: false 
          }}
          initialRouteName={'NotAuthStack'}
        >
          <Stack.Screen name="NotAuthStack" component={NotAuthStack}/>
          
          <Stack.Screen name="AuthTabs" component={AuthTab}/>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}