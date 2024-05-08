import 'react-native-gesture-handler';

import React from 'react';
import { LogBox } from 'react-native'; 

import Navigation from './src/routes/navigation';
import { AuthProvider } from './src/context/auth.context';

function App() {
  LogBox.ignoreAllLogs();

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;