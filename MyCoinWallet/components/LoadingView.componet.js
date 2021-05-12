/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Modal, ActivityIndicator} from 'react-native';
import {theme} from '../constants';

const LoadingView = ({modalVisible}) => {
  if (modalVisible) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: theme.COLORS.black,
          opacity: 0.8,
        }}>
        <ActivityIndicator
          animating={modalVisible}
          style={{alignContent: 'center', justifyContent: 'center'}}
          size="large"
          color="#00ff00"
        />
      </View>
    );
  } else {
    return <View />;
  }
};

export default LoadingView;
