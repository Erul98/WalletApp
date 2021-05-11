/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import SNavigation from './StackNavigation';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const NVContainer = () => {
  return (
    <NavigationContainer theme={theme}>
      <SNavigation />
    </NavigationContainer>
  );
};

export default NVContainer;
