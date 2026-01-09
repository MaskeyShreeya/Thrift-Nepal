import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../pages/SplashScreen'; // Import the new splash page
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';
import SellTab from '../tabs/SellTab';
import SellDetails from '../tabs/SellDetails';
import SellPricing from '../tabs/SellPricing';
import SellConfirm from '../tabs/SellConfirm';
import SellListing from '../tabs/SellListing';


export type RootStackParamList = {
  SplashScreen: undefined; // Add this
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen" // Change initial route to SplashScreen
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Search" component={Search} />
     {/* Sell flow screens */}
      {/* Sell Flow */}
  <Stack.Screen name="SellListing" component={SellListing} />
  <Stack.Screen name="SellDetails" component={SellDetails} />
  <Stack.Screen name="SellPricing" component={SellPricing} />
  <Stack.Screen name="SellConfirm" component={SellConfirm} />
    </Stack.Navigator>
  );
};

export default AppNavigator;