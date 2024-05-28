import { createDrawerNavigator } from '@react-navigation/drawer';

import ListAllGames from '../../screens/Games/ListAll';
import ListAllListsApp from '../../screens/ListsApp/ListAll';
import UserInfo from '../../screens/User/UserInfo';

const Drawer = createDrawerNavigator();

export function InfoDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="ListGames" component={ListAllGames} />
      <Drawer.Screen name="ListApp" component={ListAllListsApp} />
      <Drawer.Screen name="UserInfo" component={UserInfo} />
    </Drawer.Navigator>
  );
}
