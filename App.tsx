import 'react-native-gesture-handler';

import React from 'react';

import Navigation from './src/routes/navigation';
import Teste from './src/screens/Teste';
import { View } from 'lucide-react-native';
import { Text } from "@gluestack-ui/themed"

import Home from './src/screens/Home';


function App() {
  return (
    <Navigation />
  );
}

export default App;