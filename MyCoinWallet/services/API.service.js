/* eslint-disable no-unreachable */
import React from 'react';

export const URL = {
  base_url: 'http://192.168.1.5:8080/',
  create_wallet: 'api/v1/wallet',
  get_transaction: 'blocks',
  login: 'api/v1/auth',
  send_transaction: 'transaction',
};

export const PostMethod = async ({request_url, body = null}) => {
  try {
    let response = await fetch(URL.base_url + request_url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response !== null && response !== '') {
      let json = await response.json();
      return json;
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const GetMethod = async ({request_url, params = null}) => {
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
    console.error(error);
    return null;
  }
};

export default {GetMethod, PostMethod, URL};
