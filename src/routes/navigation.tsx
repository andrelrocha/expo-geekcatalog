import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';

import UserStack from './stack/UserStack';
import GamesStack from './stack/GameStack';
import useAuth from '../context/hooks/use-auth.hook';

const Stack = createStackNavigator();

export default function Navigation() {
  const { authState, currentUser } = useAuth(); // FAZER VALIDAÇÃO DE O USUÁRIO ESTÁ LOGADO OU NÃO PARA EXIBIR AS VIEWS OU REDIRECIONAR PARA LOGIN
  const { authenticated } = authState;


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
  