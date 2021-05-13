/* eslint-disable no-unused-vars */
import React from 'react';
import NetInfo from '@react-native-community/netinfo';

const checkInternetConnection = () => {
  return NetInfo.addEventListener(state => {
    return state.isConnected;
  });
};

export default checkInternetConnection;
