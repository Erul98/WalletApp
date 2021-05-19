/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {theme, icons, images} from '../constants';
import QRCode from 'react-native-qrcode-svg';
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-community/clipboard';

const Scan = props => {
  const [isShowView, setShowView] = React.useState(false);
  const [getIcon, setIcon] = React.useState(icons.code_qr);
  const [getIconText, setIconText] = React.useState('QR Code');
  const [getData, setData] = React.useState(null);
  const [address, setAddress] = React.useState('');
  console.log(props.route.params?.data);
  React.useEffect(() => {
    setData(props.route.params?.data);
  }, []);

  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const renderQRCode = () => {
    return (
      <QRCode
        size={theme.SIZES.width - theme.SIZES.padding * 10}
        value={getData !== null ? getData.body.address : 'ERROR'}
      />
    );
  };
  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: theme.SIZES.padding * 4,
          paddingHorizontal: theme.SIZES.padding * 3,
        }}>
        <View
          style={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: theme.COLORS.white,
              ...theme.FONTS.body3,
              textAlign: 'center',
            }}>
            Scan for address to transfer
          </Text>
        </View>
      </View>
    );
  };

  function renderAddressFromQR() {
    return (
      <View>
        <View>
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
                marginEnd: theme.SIZES.padding * 2,
                borderBottomColor: theme.COLORS.black,
                borderBottomWidth: 1,
                height: 20,
                color: theme.COLORS.black,
                ...theme.FONTS.body3,
              }}
              value={address}
            />
            <TouchableOpacity
              onPress={() => Clipboard.setString(address)}
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
      </View>
    );
  }

  const renderQRMethod = () => {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 260,
          padding: theme.SIZES.padding * 3,
          borderTopLeftRadius: theme.SIZES.radius,
          borderTopRightRadius: theme.SIZES.radius,
          backgroundColor: theme.COLORS.white,
        }}>
        {renderAddressFromQR()}
        <Text
          style={{
            marginTop: theme.SIZES.padding,
            ...theme.FONTS.body3,
          }}>
          Wallet address QR code
        </Text>
        <TouchableOpacity
          style={{
            marginTop: theme.SIZES.padding,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => {
            if (!isShowView) {
              setShowView(true);
              setIcon(icons.scan_qr);
              setIconText('Scan QR Code');
              fadeIn();
            } else {
              setShowView(false);
              setIcon(icons.code_qr);
              setIconText('QR Code');
              fadeOut();
            }
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: theme.COLORS.lightpurple,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={getIcon}
              resizeMode={'cover'}
              style={{height: 25, width: 25, tintColor: theme.COLORS.purple}}
            />
          </View>
          <Text
            style={{
              marginLeft: theme.SIZES.padding,
              color: theme.COLORS.black,
              ...theme.FONTS.body5,
            }}>
            {getIconText}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderScanFocus = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={images.focus}
          resizeMode="stretch"
          style={{
            width: '55%',
            height: '40%',
            marginTop: '-55%',
          }}
        />
      </View>
    );
  };

  const onBarCodeRead = result => {
    if (result.data !== 'ERROR' && address !== result.data) {
      setAddress(result.data);
      // props.navigation.navigate('Wallet', {payee: result.data});
    } else {
      console.log('ERROR CODE');
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <LinearGradient
        colors={[theme.COLORS.lime, theme.COLORS.emerald]}
        style={{flex: 1}}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={{flex: 1}}
          onBarCodeRead={onBarCodeRead}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}>
          {renderHeader()}
          {renderScanFocus()}
          {renderQRMethod()}
        </RNCamera>
        <Animated.View
          style={[
            styles.container,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
          {renderQRCode()}
          {/* <Text style={styles.fadingText}>Fading View!</Text> */}
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 230,
    right: 0,
    backgroundColor: theme.COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default Scan;
