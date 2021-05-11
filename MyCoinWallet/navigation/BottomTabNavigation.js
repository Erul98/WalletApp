/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View, Image, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Screens from '.././screens';
import {icons} from '../constants';
import {COLORS, FONTS} from '../constants/theme';

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        activeTintColor: COLORS.primary,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: COLORS.white,
          borderTopColor: 'transparent',
          height: 100,
        },
      }}
      initialRouteName={'Wallet'}>
      <Tab.Screen
        name="Wallet"
        component={Screens.Wallet}
        options={{
          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.wallet}
                resizeMode={'contain'}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
              <Text
                style={{
                  color: color,
                  ...FONTS.body5,
                }}>
                WALLET
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Screens.Transaction}
        options={{
          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.transaction}
                resizeMode={'contain'}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
              <Text
                style={{
                  color: color,
                  ...FONTS.body5,
                }}>
                Transaction
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={Screens.Scan}
        options={{
          tabBarIcon: ({color}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={icons.scan}
                resizeMode={'contain'}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: color,
                }}
              />
              <Text
                style={{
                  color: color,
                  ...FONTS.body5,
                }}>
                SCAN
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MyTabs;
