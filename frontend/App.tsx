import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/routes/AppNavigator';
import { SearchProvider } from './src/context/SearchContext';

const App = () => {
  return (
    <SafeAreaProvider>
      <SearchProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SearchProvider>
    </SafeAreaProvider>
  );
};

export default App;
