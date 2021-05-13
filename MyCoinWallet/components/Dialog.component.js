/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import {theme} from '../constants';

const Dialog = ({modalVisible, message, callBack, decorade}) => {
  const modalBody = (
    <View style={styles.modalBody}>
      <Text style={{...decorade, ...theme.FONTS.body3}}>{message}</Text>
    </View>
  );

  const modalFooter = (
    <View style={styles.modalFooter}>
      <View style={styles.divider} />
      <View style={{flexDirection: 'row', margin: 10}}>
        <TouchableOpacity
          style={{
            flex: 1,
            ...styles.actions,
            backgroundColor: theme.COLORS.green,
          }}
          onPress={() => {
            callBack();
          }}>
          <Text style={styles.actionText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const modalContainer = (
    <View style={styles.modalContainer}>
      {modalBody}
      {modalFooter}
    </View>
  );

  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}>
      <View style={styles.modal}>
        <View>{modalContainer}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: '#00000099',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: theme.SIZES.width - theme.SIZES.padding * 8,
    backgroundColor: '#f9fafb',
    borderRadius: 5,
  },
  modalHeader: {},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
    color: '#000',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
  },
  modalBody: {
    backgroundColor: '#fff',
    marginVertical: theme.SIZES.padding * 2,
    marginHorizontal: theme.SIZES.padding * 2,
  },
  modalFooter: {},
  actions: {
    borderRadius: 5,
    marginHorizontal: 100,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Dialog;
