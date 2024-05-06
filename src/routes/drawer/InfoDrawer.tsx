import { createDrawerNavigator } from '@react-navigation/drawer';

import About from '../../screens/About';
import Create from '../../screens/User/Create';
import Login from '../../screens/User/Login';

const Drawer = createDrawerNavigator();

export default function InfoDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Sign In" component={Login} />
      <Drawer.Screen name="Sign Up" component={Create} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}