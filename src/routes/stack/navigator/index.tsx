import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import { colors } from '../../../utils/colors';

type AppStackNavigatorProps = {
  children: React.ReactNode;
  initialRouteName?: string;
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

export default function MyStackNavigator(props: AppStackNavigatorProps) {
  return (
    <Stack.Navigator 
    screenOptions={({ route, navigation }) => ({
      headerRight: () => <Image source={logo} style={{ width: 50, height: '90%', marginRight: 10 }} />,
      headerStyle,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTintColor: colors.black,
      initialRouteName: props.initialRouteName,
    })}
  >
      {props.children}
      
    </Stack.Navigator>
  );
}