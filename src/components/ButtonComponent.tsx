import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Fonts} from '../workers/Fonts';

interface ButtonProps {
  colors: object;
  onPress: Function;
  text: string;
  style: ViewProps['style'];
  Icon?: null | keyof JSX.IntrinsicElements | Function;
  textStyle: TextProps['style'];
  disabled: boolean;
}

const ButtonComponent = (props: ButtonProps) => {
  const {colors, onPress, text, style, Icon, textStyle, disabled} = props;

  return (
    <View style={{}}>
      <TouchableOpacity
        disabled={disabled ? disabled : false}
        onPress={() => onPress()}
        style={[
          {
            backgroundColor: colors.buttonBackground,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          },
          style,
        ]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {Icon ? (
            <View style={{paddingLeft: moderateScale(10)}}>
              <Icon />
            </View>
          ) : null}
          <Text
            style={[
              {
                fontSize: moderateScale(14),
                paddingHorizontal: scale(10),
                paddingVertical: verticalScale(12),
                color: colors.white,
                fontFamily: Fonts.Montserrat_SemiBold,
              },
              textStyle,
            ]}>
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({});
