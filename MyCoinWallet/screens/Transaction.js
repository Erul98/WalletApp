/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme, icons, images} from '../constants';

const Transaction = props => {
  const navigation = props.navigation;
  console.log(props.route.params?.screen);
  function renderHeader() {
    if (props.route.params?.screen === 'MainScreen') {
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: theme.SIZES.padding * 6,
            paddingHorizontal: theme.SIZES.padding * 2,
          }}
          onPress={() => navigation.goBack()}>
          <Image
            source={icons.back}
            resizeMode={'contain'}
            style={{
              width: 20,
              height: 20,
              tintColor: theme.COLORS.white,
            }}
          />
          <Text
            style={{
              marginLeft: theme.SIZES.padding * 1.5,
              color: theme.COLORS.white,
              ...theme.FONTS.h4,
            }}>
            Back
          </Text>
        </TouchableOpacity>
      );
    }
  }
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[theme.COLORS.lime, theme.COLORS.emerald]}
        style={{flex: 1}}>
        {renderHeader()}
      </LinearGradient>
    </View>
  );
};

export default Transaction;
