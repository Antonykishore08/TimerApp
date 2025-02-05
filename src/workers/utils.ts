/* eslint-disable prettier/prettier */
/* eslint-disable handle-callback-err */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Toast from 'react-native-toast-message';
import SimpleToast from 'react-native-simple-toast';
const log = console.log;
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { store } from '../store';
import { Alert, LayoutAnimation, Linking } from 'react-native';
// import RNCalendarEvents from 'react-native-calendar-events';


export const ToastComponent = (message:string) => {
  SimpleToast.show(message, SimpleToast.SHORT, SimpleToast.TOP);
};
export const infoBox = (message: string) => {
  Toast.show({
    type: 'successMsg',
    text1: message,
    topOffset: 150,
    bottomOffset: verticalScale(70),
    position: 'bottom',
    visibilityTime: 3000,
    swipeable:false,
    props: {
      text1NumberOfLines: 3,
    },
  });
};

export const errorBox = (message: string) => {
  Toast.show({
    type: 'errorMsg',
    text1: `${message}`,
    topOffset: 150,
    bottomOffset: verticalScale(70),
    position: 'bottom',
    visibilityTime: 3000,
    swipeable:false,
    props: {
      text1NumberOfLines: 3,
    },
  });
};

export const resetToNavigation = async (
  CommonActions: any,
  navigation: any,
  name:any
) => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        {
          name: name,
        },
      ],
    }),
  );
};
export function layoutAnimation() {
  LayoutAnimation.configureNext({
    duration: 300,
    create: {type: 'linear', property: 'opacity'},
    update: {type: 'linear', property: 'opacity'},
    delete: {type: 'linear', property: 'opacity'},
  });
}