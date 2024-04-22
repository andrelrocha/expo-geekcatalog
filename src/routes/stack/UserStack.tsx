import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import LoginWithContext from '../../screens/User/Login';
import Create from '../../screens/User/Create';
import { colors } from '../../utils/colors';

const logo = require('../../assets/controller-xbox.png');
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator 
    screenOptions={({ route, navigation }) => ({
      headerRight: () => <Image source={logo} style={{ width: 50, height: '90%', marginRight: 10 }} />,
      headerStyle: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: colors.sage
      },
      headerTitleStyle: {
        fontWeight: 'bold', // Define o texto do route.name em negrito
      },
      headerTintColor: colors.black,
    })}
  >
      <Stack.Screen name="Login" component={LoginWithContext} />
      <Stack.Screen name="SignUp" component={Create} options={{ title: 'Sign Up' }} />
    </Stack.Navigator>
  );
}