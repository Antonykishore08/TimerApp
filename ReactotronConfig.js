import AsyncStorage from '@react-native-async-storage/async-storage';
import Reactotron from 'reactotron-react-native';
import {reactotronRedux} from 'reactotron-redux';
import DeviceInfo from 'react-native-device-info';

const reactotron = Reactotron
  // .setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure({
    getClientId: () => DeviceInfo.getAndroidId(), // fix multiple connections
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect()
  .use(reactotronRedux());

console.tron = reactotron;
export default reactotron;

// adb reverse tcp:9090 tcp:9090
