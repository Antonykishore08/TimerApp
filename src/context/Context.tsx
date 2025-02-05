import React, {createContext, useEffect, useState} from 'react';
import {
  Appearance,
  StatusBar,
  Keyboard,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {darkColors, height, lightColors, width} from '../workers/colors';
import {useFocusEffect} from '@react-navigation/native';
import {getDarkMode} from '../workers/localStorage';
import ReactNativeModal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import assets_manifest from '../components/assets_manifest';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {TimerProps} from '../components/AddTimer';
import {updateTimerList} from '../store/actions/appActions';
import {store} from '../store';

export const AuthContext = createContext();

export const AuthProvider = ({children}: any) => {
  const [DarkMode, setDarkMode] = useState(false);
  const [keyboardVisible, setkeyboardVisible] = useState(false);
  const [showPopup, setshowPopup] = useState(false);
  const [taskName, settaskName] = useState('');

  const colors = DarkMode ? darkColors : lightColors;
  useEffect(() => {
    checkDarkMode();
    loadData();
  }, []);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({colorScheme}) => {
      checkDarkMode();
    });

    return () => {
      subscription.remove();
    };
  }, [Appearance, DarkMode]);

  useFocusEffect(
    React.useCallback(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
          setkeyboardVisible(true);
          // LayoutAnimation.configureNext({
          //   duration: 300,
          //   create: {type: 'linear', property: 'opacity'},
          //   update: {type: 'linear', property: 'opacity'},
          //   delete: {type: 'linear', property: 'opacity'},
          // });
        },
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          setkeyboardVisible(false);
        },
      );

      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    }, []),
  );

  const loadData = async () => {
    let data = store.getState().app.timerList;
    data.map((timer: TimerProps) => (timer.running = false));
    store.dispatch(updateTimerList(data));
  };

  const checkDarkMode = async () => {
    let mode = await getDarkMode();
    const colorScheme = Appearance.getColorScheme();
    if (mode) {
      if (mode == 'true') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    } else {
      if (colorScheme == 'dark') {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    }
  };

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={DarkMode ? darkColors.black : darkColors.white}
        barStyle={DarkMode ? 'light-content' : 'dark-content'}
      />
      <AuthContext.Provider
        value={{
          DarkMode,
          setDarkMode,
          keyboardVisible,
          setkeyboardVisible,
          showPopup,
          setshowPopup,
          taskName,
          settaskName,
        }}>
        <View style={{flex: 1}}>
          <ReactNativeModal
            style={{margin: 0, padding: 0}}
            backdropColor="transparent"
            isVisible={showPopup}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setshowPopup(false);
              }}
              style={{
                height: height,
                width: width,
                margin: 0,
                padding: 0,
                position: 'absolute',
                zIndex: 8,
                backgroundColor: 'transparent',
              }}>
              <View
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  backgroundColor: DarkMode ? 'transparent' : colors.backDrop,
                  zIndex: -1,
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    alignItems: 'center',
                    padding: moderateScale(20),
                    borderRadius: moderateScale(10),
                    minHeight: moderateScale(200),
                    justifyContent: 'center',
                    marginHorizontal: moderateScale(10),
                  }}>
                  <Text
                    style={{
                      fontSize: moderateScale(20),
                      color: colors.black,
                      fontWeight: 'bold',
                    }}>
                    🎉 Congratulations! 🎉
                  </Text>
                  <Text
                    style={{
                      fontSize: moderateScale(16),
                      fontWeight: 'bold',
                      color: colors.black,
                    }}>
                    You have completed the {taskName}
                  </Text>
                </View>
              </View>
              <LottieView
                resizeMode="cover"
                autoPlay={true}
                loop={false}
                style={{
                  height: '100%',
                  width: '100%',
                }}
                source={assets_manifest.confetti}
              />
            </TouchableOpacity>
          </ReactNativeModal>

          {children}
        </View>
      </AuthContext.Provider>
    </>
  );
};
