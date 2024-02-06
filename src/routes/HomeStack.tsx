import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {Routes} from '../types/router';
import {InvoiceDetails} from '../screens/InvoiceDetails';

const Stack = createStackNavigator<Routes>();

export const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="InvoiceDetails" component={InvoiceDetails} />
    </Stack.Navigator>
  );
};
