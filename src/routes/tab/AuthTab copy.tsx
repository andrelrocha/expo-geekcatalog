import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminStack from '../stack/AdminStack';
import GamesStack from '../stack/GameStack';
import UserStack from '../stack/UserStack';
import ListsAppStack from '../stack/ListsAppStack';
import { UserIcon, GameControllerIcon, ShieldIcon, ListIcon } from '../../components/icons';
import { colors } from '../../utils/colors';
import { useAuth } from '../../context/hooks';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function AuthTab() {
  const { currentUser } = useAuth();

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
          name="ListsApp" 
          component={ListsAppStack} 
          options={{
            title: 'Lists',
            tabBarIcon: ({focused, color, size}) => {
              if (focused) {
                color = colors.black;
              } else {
                color = colors.sage;
              }

              return <ListIcon color={color} size={26}/>;
            },
            tabBarActiveTintColor: colors.black,
          }}
      />

      {currentUser && currentUser.role === 'ADMIN' && (
        <Tab.Screen
          name="Admin"
          component={AdminStack}
          options={{
            tabBarIcon: ({focused, color, size}) => {
              if (focused) {
                color = colors.black;
              } else {
                color = colors.sage;
              }

              return <ShieldIcon color={color} size={26}/>;
            },
            tabBarActiveTintColor: colors.black,
          }}
        />  
      )}

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

export default function DrawerNavigation () {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={AuthTab} />
      <Drawer.Screen name="UserInfo" component={UserStack} />
      <Drawer.Screen name="ListGames" component={GamesStack} />
      <Drawer.Screen name="ListApp" component={ListsAppStack} />
    </Drawer.Navigator>
  );
}