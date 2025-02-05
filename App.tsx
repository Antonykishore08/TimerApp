import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  LogBox,
  TouchableOpacity,
  Linking,
  Image,
  Platform,
  useWindowDimensions,
  TextInput,
  UIManager,
} from 'react-native';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import RNRestart from 'react-native-restart';
import RootNavigation from './src/navigation/rootNavigation';
import {AuthProvider} from './src/context/Context';
import {useTailwind} from 'tailwind-rn';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import {toastConfig} from './src/workers/toastConfig';
import OfflineScreen from './src/screens/OfflineScreen';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from 'react-native-splash-screen';
LogBox.ignoreAllLogs();
if (__DEV__ === false) {
  console.log = () => {};
}
console.disableYellowBox = true;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps.maxFontSizeMultiplier = 1;
TextInput.defaultProps.maxFontSizeMultiplier = 1;
View.defaultProps = View.defaultProps || {};
View.defaultProps.allowFontScaling = false;
const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <AuthProvider>
          <PersistGate loading={null} persistor={persistor}>
            <Provider store={store}>
              <RootNavigation />
            </Provider>
          </PersistGate>
        </AuthProvider>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </SafeAreaView>
  );
};

export default App;
