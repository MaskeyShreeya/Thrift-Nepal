// AppNavigator.tsx
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import SplashScreen from '../pages/SplashScreen';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';
import HomeTab from '../tabs/HomeTab';
import SellListing from '../tabs/SellListing';
import SellDetails from '../tabs/SellDetails';
import SellPricing from '../tabs/SellPricing';
import SellConfirm from '../tabs/SellConfirm';
import Profile from '../pages/Profile';
import ItemDetails from '../tabs/ItemDetails';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="SellListing" component={SellListing} />
      <Stack.Screen name="SellDetails" component={SellDetails} />
      <Stack.Screen name="SellPricing" component={SellPricing} />
      <Stack.Screen name="SellConfirm" component={SellConfirm} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
