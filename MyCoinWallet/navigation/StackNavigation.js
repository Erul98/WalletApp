/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import * as Screens from '.././screens';
import {createStackNavigator} from '@react-navigation/stack';
import MyTabs from './BottomTabNavigation';

const Stack = createStackNavigator();

const SNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={'MainScreen'}>
      <Stack.Screen name="MainScreen" component={Screens.MainScreen} />
      <Stack.Screen name="SignIn" component={Screens.SignIn} />
      <Stack.Screen name="Transaction" component={Screens.Transaction} />
      <Stack.Screen name="TabBottom" component={MyTabs} />
    </Stack.Navigator>
  );
};

export default SNavigation;
