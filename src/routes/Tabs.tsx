import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AuthContext} from '../context/auth';
import {Login} from '../screens/Login';
import {Routes} from '../types/router';
import {AddInvoice} from '../screens/AddInvoice';
import {Profile} from '../screens/Profile';
import {HomeStack} from './HomeStack';
import {Chat} from '../screens/Chat';
import {Pay} from '../screens/Pay';

const Tab = createBottomTabNavigator<Routes>();

export const Tabs = () => {
  const {authData} = useContext(AuthContext);
  if (!authData.token) {
    return <Login />;
  }

  return (
    <>
      <Tab.Navigator initialRouteName="HomeStack">
        <Tab.Screen
          name="HomeStack"
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            title: 'Home',
            unmountOnBlur: true,
          }}
        />
        <Tab.Screen
          name="AddInvoice"
          component={AddInvoice}
          options={{
            tabBarLabel: 'Add Invoice',
            title: 'Add Invoice',
          }}
        />
        <Tab.Screen
          name="Pay"
          component={Pay}
          options={{
            tabBarLabel: 'Pay',
          }}
        />
        <Tab.Screen
          name="Chat"
          component={Chat}
          options={{
            tabBarLabel: 'Chat',
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: 'Profile',
          }}
        />
      </Tab.Navigator>
    </>
  );
};
