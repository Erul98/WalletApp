/* eslint-disable no-unused-vars */
import {NetInfo} from 'react-native';
const checkInternetConnection = () => {
  return NetInfo.isConnected.fetch().then(isConnected => {
    return isConnected;
  });
};

export default NetInfo;
