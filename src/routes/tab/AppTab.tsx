import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GamesStack from '../stack/GameStack';
import UserStack from '../stack/UserStack';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <Tab.Screen name="UserInfo" component={UserStack} />
      <Tab.Screen name="Games" component={GamesStack} />
    </Tab.Navigator>
  );
}