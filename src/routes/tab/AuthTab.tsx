import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GamesStack from '../stack/GameStack';
import UserStack from '../stack/UserStack';
import { UserIcon, GameControllerIcon } from '../../components/icons';
import { colors } from '../../utils/colors';

const Tab = createBottomTabNavigator();

export default function AuthTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false  
      }}
    >
      <Tab.Screen
        name="Games"
        component={GamesStack}
        options={{
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              color = colors.black;
            } else {
              color = colors.sage;
            }

            return <GameControllerIcon color={color} size={26}/>;
          },
          tabBarActiveTintColor: colors.black,
        }}
      />

      <Tab.Screen 
        name="InfoUser" 
        component={UserStack} 
        options={{
          title: 'User Info',
          tabBarIcon: ({focused, color, size}) => {
            if (focused) {
              color = colors.black;
            } else {
              color = colors.sage;
            }

            return <UserIcon color={color} size={26}/>;
          },
          tabBarActiveTintColor: colors.black,
        }}
        />
    </Tab.Navigator>
  );
}