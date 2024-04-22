import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { colors } from '../../../utils/colors';

type AppStackNavigatorProps = {
  children: React.ReactNode;
};

const logo = require('../../../assets/controller-xbox.png');
const Stack = createStackNavigator();

const headerStyle = {
  shadowColor: colors.black,
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  backgroundColor: colors.sage
};

export default function MyStackNavigator({ children }: AppStackNavigatorProps) {
  return (
    <Stack.Navigator 
    screenOptions={({ route, navigation }) => ({
      headerRight: () => <Image source={logo} style={{ width: 50, height: '90%', marginRight: 10 }} />,
      headerStyle,
      headerTitleStyle: {
        fontWeight: 'bold', // Define o texto do route.name em negrito
      },
      headerTintColor: colors.black,
    })}
  >
      {children}
      
    </Stack.Navigator>
  );
}