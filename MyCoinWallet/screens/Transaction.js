/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme, icons, checkInternetConnection} from '../constants';
import {TransactionHistory} from '../components';
import {LoadingView, Dialog} from '../components';
import {API, Socket} from '../services';

const Transaction = props => {
  const currency = props.route.params;
  const [selectedCurrency, setSelectedCurrency] = React.useState(currency);
  const [transactionHistory, setTransactionHistory] = React.useState([]);
  const [isMainScreen, setMainScreen] = React.useState(
    selectedCurrency?.screen === 'MainScreen',
  );
  const [loadingVisible, setLoadingVisible] = React.useState(false);
  const [dialogVisible, setDialogVisible] = React.useState(false);
  const [message, setMessage] = React.useState('');
  let ws = Socket();

  React.useEffect(() => {
    fetchData();
    return () => {
      ws = null;
      ws.close();
    };
  }, []);

  ws.onmessage = e => {
    ioData(e.data);
  };

  const ioData = async data => {
    try {
      const json = await JSON.parse(data);
      if (json !== null) {
        const listTx = [];
        let id = 0;
        for (const block of json) {
          for (const transaction of block.transactions) {
            transaction.timestamp = block.timestamp;
            transaction.id = id;
            transaction.blockId = block.index;
            listTx.push(transaction);
            id++;
          }
        }
        setTransactionHistory(listTx);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    setLoadingVisible(true);
    if (!checkInternetConnection()) {
      setLoadingVisible(false);
      setDialogVisible(true);
      setMessage('Internet Not Active');
      return;
    }
    const data = await API.GetMethod({
      request_url: API.URL.get_transaction,
    });
    if (data !== null) {
      setLoadingVisible(false);
      const listTx = [];
      let id = 0;
      for (const block of data) {
        console.log(block);
        for (const transaction of block.transactions) {
          transaction.timestamp = block.timestamp;
          transaction.id = id;
          transaction.blockId = block.index;
          listTx.push(transaction);
          id++;
        }
      }
      setTransactionHistory(listTx);
    } else {
      setLoadingVisible(false);
      setDialogVisible(true);
      setMessage('Server Error');
    }
  };

  const navigation = props.navigation;
  function renderHeader() {
    if (isMainScreen) {
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
  }

  const callBackFromDialog = () => {
    setDialogVisible(false);
  };

  function renderTransactionHistory() {
    return (
      <View
        style={{
          flex: 1,
          marginBottom: isMainScreen ? 0 : 100,
          marginTop: isMainScreen
            ? theme.SIZES.padding
            : theme.SIZES.padding * 4,
        }}>
        <TransactionHistory
          customContainerStyle={{...styles.shadow}}
          history={transactionHistory}
        />
        <LoadingView modalVisible={loadingVisible} />
        <Dialog
          modalVisible={dialogVisible}
          message={message}
          callBack={callBackFromDialog}
          align={'center'}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[theme.COLORS.lime, theme.COLORS.emerald]}
        style={{flex: 1}}>
        {renderHeader()}
        {renderTransactionHistory()}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: theme.COLORS.white,
    shadowOffset: {
      with: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});

export default Transaction;
