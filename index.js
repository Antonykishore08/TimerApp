/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {NotificationChannel} from './src/workers/utils';
if (__DEV__) {
  import('./ReactotronConfig').then(() => {
    return;
  });
}

AppRegistry.registerComponent(appName, () => App);
