/* eslint-disable no-unreachable */
import React from 'react';

export const URL = {
  base_socket_url: 'http://192.168.1.3:40567',
  base_url: 'http://192.168.1.3:8080/',
  create_wallet: 'api/v1/wallet',
  get_transaction: 'api/v1/blocks',
  login: 'api/v1/auth',
  send_transaction: 'api/v1/transactions',
};

export const PostMethod = async ({request_url, body = null}) => {
  try {
    let response = await fetch(URL.base_url + request_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    });
    if (response !== null && response !== '') {
      let json = await response.json();
      return json;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const GetMethod = async ({request_url, params = ''}) => {
  try {
    let response = await fetch(URL.base_url + request_url + params, {
      method: 'GET',
    });
    if (response !== null && response !== '') {
      let json = await response.json();
      return json;
    }
    return null;
  } catch (error) {
    //console.log(error);
    return null;
  }
};

export default {GetMethod, PostMethod, URL};
