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

const Wallet = props => {
  const navigation = props.navigation;
  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.SIZES.padding * 6,
          paddingHorizontal: theme.SIZES.padding * 2,
        }}
        onPress={() => navigation.navigate('MainScreen')}>
        <Image
          source={icons.close}
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
          Logout
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: theme.SIZES.padding * 2,
          height: theme.SIZES.padding * 10,
          flexDirection: 'row',
          marginHorizontal: theme.SIZES.padding * 2,
        }}>
        <Image
          source={images.walletLogo}
          resizeMode={'contain'}
          style={{
            flex: 1,
            width: theme.SIZES.padding * 10,
            height: theme.SIZES.padding * 10,
          }}
        />
        <View
          style={{
            flex: 2,
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              marginStart: theme.SIZES.padding * 2,
            }}>
            <View style={{flex: 1}}>
              <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
                Address:
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
                Amount of coint:
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          flex: 1,
          marginTop: theme.SIZES.padding * 3,
          marginHorizontal: theme.SIZES.padding * 3,
        }}>
        {/* Payer */}
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Payee address (Read Only)
          </Text>
          <TextInput
            editable={false}
            style={{
              marginVertical: theme.SIZES.padding,
              borderBottomColor: theme.COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: theme.COLORS.white,
              ...theme.FONTS.body3,
            }}
          />
        </View>
        {/* Payee */}
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Payer address
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
            placeholder={'Enter payer '}
            placeholderTextColor={theme.COLORS.white}
            selectionColor={theme.COLORS.white}
          />
        </View>
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Amount of Coin (Target 3 H2Y)
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
            placeholder={'Enter amount of coin '}
            placeholderTextColor={theme.COLORS.white}
            selectionColor={theme.COLORS.white}
          />
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View
        style={{
          flex: 1,
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
          onPress={() => navigation.push('TabBottom')}>
          <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
            Send Coin
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
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Wallet;
