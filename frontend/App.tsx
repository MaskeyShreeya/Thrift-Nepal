import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/routes/AppNavigator';
import { navigationRef } from './src/routes/navigation';

export default function App() {
  return (
    <NavigationContainer ref={navigationRef}>
      <AppNavigator />
    </NavigationContainer>
  );
}
