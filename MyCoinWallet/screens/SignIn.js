/* eslint-disable react-hooks/exhaustive-deps */
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
import Clipboard from '@react-native-community/clipboard';

const SignIn = props => {
  const navigation = props.navigation;
  const [valueTextInput, setValueTextInput] = React.useState(null);
  React.useEffect(() => {
    setValueTextInput(props.route.params?.data.body.privateKey);
  }, []);
  const loginWallet = async key => {
    try {
      let response = await fetch('http://192.168.1.5:8080/api/v1/auth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({key: key}),
      });
      let json = await response.json();
      console.log(json);
      if (json.body !== null) {
        navigation.push('TabBottom', {data: json});
      }
    } catch (error) {
      console.error(error);
    }
  };
  function renderHeader() {
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

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: theme.SIZES.padding * 8,
          height: 10,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: theme.COLORS.lightRed,
          marginHorizontal: theme.SIZES.padding * 10,
          borderRadius: theme.SIZES.radius,
        }}>
        <Image
          source={images.walletLogo}
          resizeMode={'contain'}
          style={{
            width: theme.SIZES.padding * 12,
            height: theme.SIZES.padding * 12,
          }}
        />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: theme.SIZES.padding * 6,
          marginHorizontal: theme.SIZES.padding * 3,
        }}>
        {/* Full Name */}
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Private Key
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
            }}>
            <TextInput
              style={{
                flex: 10,
                marginVertical: theme.SIZES.padding,
                borderBottomColor: theme.COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: theme.COLORS.white,
                ...theme.FONTS.body3,
              }}
              value={valueTextInput}
              onChangeText={textChanged => setValueTextInput(textChanged)}
              placeholder={'Enter your private key'}
              placeholderTextColor={theme.COLORS.white}
              selectionColor={theme.COLORS.white}
            />
            <TouchableOpacity
              onPress={() => Clipboard.setString(valueTextInput)}
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                source={icons.copy}
                resizeMode={'contain'}
                style={{
                  height: 25,
                  width: 25,
                  tintColor: theme.COLORS.purple,
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          </View>
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
          onPress={() => loginWallet(valueTextInput)}>
          <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
            Sign In
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

export default SignIn;
