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

const Wallet = props => {
  const navigation = props.navigation;
  const [getData, setData] = React.useState(null);
  const [getPayee, setPayee] = React.useState(null);
  const [_mount, _setMount] = React.useState(0);
  const [loadingVisible, setLoadingVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  React.useEffect(() => {
    setData(props.route.params?.data);
  }, []);

  React.useEffect(() => {
    setPayee(props.route.params?.payee);
  }, [props.route.params?.payee]);

  function sendMoneny() {
    if (_mount < 0.0000001) {
      setDialogVisible(true);
      setMessage('Money must be more 0.0000001 AHY');
      return;
    } else if (_mount > getData.body.amount) {
      setDialogVisible(true);
      setMessage('Not enough money to send');
      return;
    }
    if (getPayee === null || getPayee === '' || getPayee === undefined) {
      setDialogVisible(true);
      setMessage('Payee must not null');
      return;
    }
    const data = {
      amount: _mount,
      privateKey: props.route.params?.privateKey,
      payerAdress: getData.body.address,
      payeeAdress: getPayee,
    };
    fetchData(data);
  }

  const fetchData = async body => {
    setLoadingVisible(true);
    if (!checkInternetConnection()) {
      setLoadingVisible(false);
      setDialogVisible(true);
      setMessage('Internet Not Active');
      return;
    }
    const data = await API.PostMethod({
      request_url: API.URL.send_transaction,
      body: JSON.stringify(body),
    });
    setLoadingVisible(false);
    setDialogVisible(true);
    if (data !== null) {
      if (data.status === 200) {
        const value = getData;
        value.body.amount = getData.body.amount - _mount;
        setData(value);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } else {
      setMessage('Send transaction to network fail');
    }
  };

  const callBackFromDialog = () => {
    setDialogVisible(false);
  };

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
              <Text
                style={{color: theme.COLORS.white, ...theme.FONTS.body3}}
                numberOfLines={2}>
                Address: {getData !== null ? getData.body.address : 'null'}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
                Amount of coint:{' '}
                {getData !== null ? getData.body.amount : 'null'} AHY
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
        <View
          style={{
            marginTop: theme.SIZES.padding * 3,
          }}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Payer address (Read Only)
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'stretch',
            }}>
            <TextInput
              editable={false}
              style={{
                flex: 10,
                marginVertical: theme.SIZES.padding,
                borderBottomColor: theme.COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: theme.COLORS.white,
                ...theme.FONTS.body3,
              }}
              value={getData !== null ? getData.body.address : ''}
            />
            <TouchableOpacity
              onPress={() =>
                Clipboard.setString(
                  getData !== null ? getData.body.address : '',
                )
              }
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
        {/* Payee */}
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Payee address
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
            placeholder={'Enter payee '}
            placeholderTextColor={theme.COLORS.white}
            selectionColor={theme.COLORS.white}
            value={getPayee !== null ? getPayee : ''}
            onChangeText={textChanged => setPayee(textChanged)}
          />
        </View>
        <View style={{marginTop: theme.SIZES.padding * 3}}>
          <Text style={{color: theme.COLORS.lightGreen, ...theme.FONTS.body3}}>
            Amount of Coin (Target 0.0000001 H2Y)
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
            keyboardType={'numbers-and-punctuation'}
            placeholder={'Enter amount of coin '}
            placeholderTextColor={theme.COLORS.white}
            selectionColor={theme.COLORS.white}
            value={_mount.toString()}
            onChangeText={textChanged => _setMount(textChanged)}
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
          marginBottom: theme.SIZES.padding * 3,
        }}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: theme.COLORS.black,
            borderRadius: theme.SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => sendMoneny()}>
          <Text style={{color: theme.COLORS.white, ...theme.FONTS.body3}}>
            Send Coin
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : null}
      style={{flex: 1, marginBottom: 100}}>
      <LinearGradient
        colors={[theme.COLORS.lime, theme.COLORS.emerald]}
        style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
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

export default Wallet;
