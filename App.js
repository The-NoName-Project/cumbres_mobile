import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './components/context/AuthContext';
import Navigation from './components/navigation/Navigation';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar backgroundColor="#347eff" />
      <Navigation />
    </AuthProvider>
  );
};

export default App;
