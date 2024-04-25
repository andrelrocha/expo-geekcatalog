import 'react-native-gesture-handler';

import React from 'react';

import Navigation from './src/routes/navigation';
import { AuthProvider } from './src/context/auth.context';

function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}

export default App;