/* eslint-disable no-unused-vars */
import React from 'react';
import NetInfo from '@react-native-community/netinfo';

const checkInternetConnection = () => {
  return NetInfo.isConnected.fetch().then(isConnected => {
    return isConnected;
  });
};

export default NetInfo;
