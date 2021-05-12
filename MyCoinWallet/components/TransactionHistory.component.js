/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {icons, theme} from '../constants';

const TransactionHistory = ({customContainerStyle, history}) => {
  const renderItem = React.useCallback(({item}) => {
    if (history === null) {
      return <View />;
    }
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.SIZES.base,
          marginTop: theme.SIZES.padding * 3,
        }}>
        <Image
          source={icons.transaction}
          resizeMode={'cover'}
          style={{width: 25, height: 25, tintColor: theme.COLORS.purple}}
        />
        <View style={{flex: 1, marginLeft: theme.SIZES.radius}}>
          <Text style={{...theme.FONTS.h3}}>Resolved</Text>
          <Text
            style={{
              color: theme.COLORS.gray,
              ...theme.FONTS.body4,
              width: '80%',
            }}
            numberOfLines={2}>
            {longToDate(item.timestamp)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
          }}>
          <Text style={{color: theme.COLORS.green, ...theme.FONTS.body3}}>
            {item.amount} AHY
          </Text>
        </View>
      </TouchableOpacity>
    );
  });
  return (
    <View
      style={{
        flex: 1,
        marginBottom: theme.SIZES.padding,
        marginTop: theme.SIZES.padding,
        marginHorizontal: theme.SIZES.padding,
        padding: 20,
        borderRadius: theme.SIZES.radius / 2,
        backgroundColor: theme.COLORS.white,
        ...customContainerStyle,
      }}>
      <Text style={{...theme.FONTS.h2}}>Transaction History</Text>
      <FlatList
        contentContainerStyle={{marginTop: theme.SIZES.padding}}
        scrollEnabled={true}
        data={history.sort((a, b) => a < b)}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => (
          <View
            style={{
              width: '100%',
              height: 1,
              backgroundColor: theme.COLORS.lightGray,
            }}
          />
        )}
      />
    </View>
  );
};

const longToDate = millisec => {
  return new Date(millisec).toUTCString();
};

export default TransactionHistory;
