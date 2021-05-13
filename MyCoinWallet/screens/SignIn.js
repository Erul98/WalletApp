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
import {theme, icons, images, checkInternetConnection} from '../constants';
import Clipboard from '@react-native-community/clipboard';
import {API} from '../services';
import {LoadingView, Dialog} from '../components';

const SignIn = props => {
  const navigation = props.navigation;
  const [valueTextInput, setValueTextInput] = React.useState(null);
  const [loadingVisible, setLoadingVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  React.useEffect(() => {
    setValueTextInput(props.route.params?.data.body.privateKey);
  }, []);
  const loginWallet = async key => {
    if (!checkInternetConnection()) {
      setLoadingVisible(false);
      setDialogVisible(true);
      setMessage('Internet Not Active');
      return;
    }
    const data = await API.PostMethod({
      request_url: API.URL.login,
      body: JSON.stringify({key: key}),
    });
    setLoadingVisible(false);
    if (data !== null) {
      if (data.status === 200) {
        if (data.body !== null) {
          navigation.push('TabBottom', {
            data: data,
            privateKey: valueTextInput,
          });
        }
      } else {
        setDialogVisible(true);
        setMessage('KEY not found');
      }
    } else {
      setDialogVisible(true);
      setMessage('KEY not found');
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

  const callBackFromDialog = () => {
    setDialogVisible(false);
  };

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
          onPress={() => {
            setLoadingVisible(true);
            if (valueTextInput !== '' && valueTextInput !== undefined) {
              loginWallet(valueTextInput);
            } else {
              setLoadingVisible(false);
              setDialogVisible(true);
              setMessage('KEY must be not null');
            }
          }}>
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
        <LoadingView modalVisible={loadingVisible} />
        <Dialog
          modalVisible={dialogVisible}
          message={message}
          callBack={callBackFromDialog}
          align={'center'}
        />
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
