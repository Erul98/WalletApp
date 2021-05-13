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
import {images, theme, checkInternetConnection} from '../constants';
import {LoadingView, Dialog} from '../components';
import {API} from '../services';

const MainScreen = props => {
  const navigation = props.navigation;
  const [loadingVisible, setLoadingVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  React.useEffect(() => {}, []);
  const signUp = async () => {
    setLoadingVisible(true);
    if (!checkInternetConnection()) {
      setLoadingVisible(false);
      setDialogVisible(true);
      setMessage('Internet Not Active');
      return;
    }
    const data = await API.PostMethod({request_url: API.URL.create_wallet});
    if (data !== null) {
      setLoadingVisible(false);
      if (data.body !== null) {
        navigation.push('SignIn', {data: data});
      } else {
        setDialogVisible(true);
        setMessage('Error to generated');
      }
    } else {
      setLoadingVisible(false);
      setDialogVisible(true);
      setMessage('Server error');
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

  const callBackFromDialog = () => {
    setDialogVisible(false);
  };

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
            resizeMode={'stretch'}
            style={{
              flex: 1,
              width: theme.SIZES.width - theme.SIZES.padding * 6,
              alignContent: 'center',
              justifyContent: 'center',
              tintColor: theme.COLORS.purple,
            }}
          />
        </View>
        <View style={{flex: 1}}>{renderSubView()}</View>
      </LinearGradient>
      <LoadingView modalVisible={loadingVisible} />
      <Dialog
        modalVisible={dialogVisible}
        message={message}
        callBack={callBackFromDialog}
        align={'center'}
      />
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
