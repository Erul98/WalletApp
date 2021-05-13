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
import {images, theme, internet} from '../constants';
import {LoadingView} from '../components';
import {API} from '../services';

const MainScreen = props => {
  const navigation = props.navigation;
  const [modalVisible, setModalVisible] = React.useState(false);
  React.useEffect(() => {}, []);
  const signUp = async () => {
    setModalVisible(true);
    if (!internet.checkInternetConnection) {
      setModalVisible(false);
      return;
    }
    const data = API.PostMethod({request_url: API.URL.create_wallet});
    if (data !== null) {
      setModalVisible(false);
      if (data.body !== null) {
        //navigation.push('SignIn', {data: data});
      }
    } else {
      setModalVisible(false);
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

  const renderLoadingView = () => {};

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
      <LoadingView modalVisible={modalVisible} />
    </KeyboardAvoidingView>
  );
};

export default MainScreen;
