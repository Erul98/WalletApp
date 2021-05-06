/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TextInput,
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
          height: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.COLORS.lightRed,
          marginHorizontal: theme.SIZES.padding * 3,
        }}>
        <Image
          source={images.walletLogo}
          resizeMode={'contain'}
          style={{
            width: '35%',
          }}
        />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: theme.SIZES.padding * 3,
          marginHorizontal: theme.SIZES.padding * 3,
        }}>
        {/* Full Name */}
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Private Key
          </Text>
          <TextInput
            style={{
              marginVertical: theme.SIZES.padding,
              borderBottomColor: theme.COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: theme.COLORS.white,
              ...theme.FONTS.body3,
            }}
            placeholder={'Enter your private key'}
            placeholderTextColor={theme.COLORS.white}
            selectionColor={theme.COLORS.white}
          />
        </View>
        {/* Phone Number */}
      </View>
    );
  }

  function renderButton() {
    return (
      <View
        style={{
          marginTop: theme.SIZES.padding * 3,
          marginHorizontal: theme.SIZES.padding * 2,
        }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: theme.COLORS.black,
            borderRadius: theme.SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => console.log('Sign Up doing')}>
          <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
            Sign Up
          </Text>
        </TouchableOpacity>
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
        <ScrollView style={{flex: 1}}>
          {renderHeader()}
          <View style={{marginTop: '20%'}}>
            {renderLogo()}
            {renderForm()}
            {renderButton()}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
