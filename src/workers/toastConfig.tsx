import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import tailwind from '../../tailwind';
import assets from '../components/assets_manifest';
import {moderateScale} from 'react-native-size-matters';
import {Fonts} from './Fonts';
import {darkColors} from './colors';

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      text1NumberOfLines={3}
      style={{borderLeftColor: 'green', borderLeftWidth: 10}}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: 'black',
        opacity: 2,
      }}
      text1Style={{
        fontSize: moderateScale(15),
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        color: 'white',
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
      }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1NumberOfLines={3}
      style={{borderLeftColor: '#b81500', borderLeftWidth: 10}}
      contentContainerStyle={{
        paddingHorizontal: moderateScale(15),
        paddingVertical: 5,
        backgroundColor: 'black',
        text1NumberOfLines: 3,
        opacity: 2,
      }}
      text1Style={{
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'Poppins-Medium',
        color: 'white',
      }}
      text2Style={{
        fontSize: 12,
        fontWeight: '300',
        color: 'white',
      }}
    />
  ),

  successMsg: ({text1, ...props}) => (
    <View
      style={{
        borderColor: darkColors.green,
        borderWidth: 0,
        // paddingHorizontal: 12,
        // paddingVertical: moderateScale(8),
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1,
        borderRadius: 10,

        // borderLeftColor: '#47d147',
        // borderLeftWidth: 10,
        // borderTopRightRadius: 8,
        // borderBottomRightRadius: 8,
        opacity: 3,
        marginHorizontal: 30,
        width: '90%',
        alignSelf: 'center',
      }}>
      <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        <View
          style={{
            height: '100%',
            backgroundColor: darkColors.green,
            width: moderateScale(10),
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 12,
              paddingVertical: moderateScale(8),
            },
          ]}>
          <View style={[]}>
            <Image
              source={assets?.logoPlane}
              style={{
                height: moderateScale(30),
                width: moderateScale(30),
                resizeMode: 'contain',
                borderRadius: 50,
              }}
            />
          </View>
          <Text
            numberOfLines={3}
            style={[
              // tailwind('font-semibold font-15 pl-3'),
              {
                fontSize: moderateScale(14),
                // fontWeight: '500',
                // width:'100%',
                fontFamily: Fonts.Poppins_SemiBold,
                color: darkColors.text,
                flex: 1,
                paddingLeft: moderateScale(5),
              },
            ]}>
            {text1}
          </Text>
        </View>
      </View>
    </View>
  ),
  errorMsg: ({text1, ...props}) => (
    <View
      style={{
        borderColor: darkColors.error,
        borderWidth: 0,
        // paddingHorizontal: 12,
        // paddingVertical: moderateScale(8),
        backgroundColor: 'rgba(0,0,0,1)',
        flex: 1,
        borderRadius: 10,

        // borderLeftColor: '#47d147',
        // borderLeftWidth: 10,
        // borderTopRightRadius: 8,
        // borderBottomRightRadius: 8,
        opacity: 3,
        marginHorizontal: 30,
        width: '90%',
        alignSelf: 'center',
      }}>
      <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
        <View
          style={{
            height: '100%',
            backgroundColor: darkColors.error,
            width: moderateScale(10),
            borderTopLeftRadius: 10,
            borderBottomLeftRadius: 10,
          }}
        />
        <View
          style={[
            {
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingHorizontal: 12,
              paddingVertical: moderateScale(8),
            },
          ]}>
          <View style={[]}>
            <Image
              source={assets?.logoPlane}
              style={{
                height: moderateScale(30),
                width: moderateScale(30),
                resizeMode: 'contain',
                borderRadius: 50,
              }}
            />
          </View>
          <Text
            numberOfLines={3}
            style={[
              // tailwind('font-semibold font-15 pl-3'),
              {
                fontSize: moderateScale(14),
                // fontWeight: '500',
                // width:'100%',
                fontFamily: Fonts.Poppins_SemiBold,
                color: darkColors.text,
                flex: 1,
                paddingLeft: moderateScale(5),
              },
            ]}>
            {text1}
          </Text>
        </View>
      </View>
    </View>
  ),
};
