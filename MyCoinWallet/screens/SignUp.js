/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme, icons, images} from '../constants';

const SignUp = () => {
  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.SIZES.padding * 6,
          paddingHorizontal: theme.SIZES.padding * 2,
        }}
        onPress={() => console.log('Back')}>
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
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: theme.SIZES.padding * 8,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.walletLogo}
          resizeMode={'contain'}
          style={{
            width: '40%',
          }}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={[theme.COLORS.lime, theme.COLORS.emerald]}
        style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
