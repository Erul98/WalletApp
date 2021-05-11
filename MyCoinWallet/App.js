/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import {NVContainer} from './navigation/index';

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return <NVContainer />;
};

export default App;
