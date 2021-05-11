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
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme, icons, images} from '../constants';

const TransactionHistory = ({customContainerStyle, history}) => {
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.SIZES.base,
        }}>
        <View style={{flex: 1, marginLeft: theme.SIZES.radius}}>
          <Text style={{...theme.FONTS.h3}}>Resolved</Text>
          <Text style={{color: theme.COLORS.gray, ...theme.FONTS.body4}}>
            {item.timestamp}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
          }}>
          <Text style={{color: theme.COLORS.green, ...theme.FONTS.h3}}>
            {item.amount}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        marginTop: theme.SIZES.padding,
        marginHorizontal: theme.SIZES.padding,
        padding: 20,
        borderRadius: theme.SIZES.radius,
        backgroundColor: theme.COLORS.white,
        ...customContainerStyle,
      }}>
      <Text style={{...theme.FONTS.h2}}>Transaction History</Text>
      <FlatList
        contentContainerStyle={{marginTop: theme.SIZES.radius}}
        scrollEnabled={true}
        data={history}
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
