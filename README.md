# WalletApp
## _Deigital Wallet Application Project_

MyWallet Applicaiton for iOS device (not supported yet Android device) using react-native to build

## Features
- Login: Using private key to login app
- Sign: Create account and move to login app with private key
- Transaction History List: List all transactions of block chain real-time using WebSocket
- Send transaction: Using mywallet app to send money for other address
- QR Code: Using address to generate QR Code
- Scan QR: To get address through QR Code of other device. After that move to wallet with their address to send money for them  

## Installation

AHY requires [React Native CLI](https://reactnative.dev/docs/environment-setup) to run.

Install the dependencies and devDependencies and start the server.

```sh
yarn install
```
Change base_url and base_socket_url at service/API.service file and change to run

Build and Run system
```sh
Install libraries of pod file to run app on iOS device
npx pod-install
Run app
npx react-native run-ios or using Xcode to run ios file on real device
```

## References
https://www.youtube.com/watch?v=xBmx2eaozck