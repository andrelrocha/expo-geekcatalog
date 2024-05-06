import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NotAuthStack from './stack/NotAuthStack';
import UserStack from './stack/UserStack';

import useAuth from '../context/hooks/use-auth.hook';
import GamesStack from './stack/GameStack';
import HomeUserInfo from '../screens/User/UserHome';

const Stack = createStackNavigator();

export default function Navigation() {
  //const { authState, currentUser } = useAuth(); // FAZER VALIDAÇÃO DE O USUÁRIO ESTÁ LOGADO OU NÃO PARA EXIBIR AS VIEWS OU REDIRECIONAR PARA LOGIN
  //const { authenticated } = authState;


    return (
      <NavigationContainer>
          <Stack.Navigator 
              screenOptions={{ 
                    headerShown: false 
               }}
              initialRouteName='NotAuthStack'
          >
            <Stack.Screen name="NotAuthStack" component={NotAuthStack}/>
            <Stack.Screen name="UserStack" component={UserStack}/>
              
          </Stack.Navigator>
      </NavigationContainer>
    );
  }
  