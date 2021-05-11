/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images, theme} from '../constants';

const MainScreen = props => {
  const navigation = props.navigation;
  //   const goToTransactionScreen = () => {
  //     const navigateAction = NavigationActions.navigate({
  //       routeName: 'Transaction',
  //       params: {previous_screen: 'MainScreen'}, // current screen
  //       action: NavigationActions.navigate('Transaction'), // screen you want to navigate to
  //     });
  //     navigation.dispatch(navigateAction);
  //   };
  const signUp = async () => {
    try {
      let response = await fetch('http://192.168.1.5:8080/api/v1/wallet', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let json = await response.json();
      console.log(json);
      if (json.body !== null) {
        navigation.push('SignIn', {data: json});
      }
    } catch (error) {
      console.error(error);
    }
  };
  function renderSubView() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'stretch',
        }}>
        <View
          style={{
            marginTop: theme.SIZES.padding,
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
            onPress={() => navigation.push('SignIn')}>
            <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: theme.SIZES.padding,
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
            onPress={() => signUp()}>
            <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: theme.SIZES.padding,
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
            onPress={() =>
              navigation.push('Transaction', {screen: 'MainScreen'})
            }>
            <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
              Transaction
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient
        colors={[theme.COLORS.lime, theme.COLORS.emerald]}
        style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              alignContent: 'center',
              justifyContent: 'center',
              width: theme.SIZES.width,
              textAlign: 'center',
              marginTop: theme.SIZES.padding * 3,
            }}>
            <Text
              style={{
                color: theme.COLORS.white,
                ...theme.FONTS.h1,
                textAlign: 'center',
              }}>
              MY WALLET
            </Text>
          </View>
          <Image
            source={images.cardATM}
            resizeMode={'contain'}
            style={{
              flex: 1,
              width: theme.SIZES.width - theme.SIZES.padding * 10,
              height: 200,
              alignContent: 'center',
              justifyContent: 'center',
              tintColor: theme.COLORS.purple,
            }}
          />
        </View>
        <View style={{flex: 1}}>{renderSubView()}</View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
