import {
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
  TextInputProps,
  ViewProps,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {Fonts} from '../workers/Fonts';

interface inputProps {
  colors: object;
  value: string;
  onChangeText: TextInputProps['onChangeText'];
  placeholder: string;
  keyboardType: TextInputProps['keyboardType'];
  secureTextEntry: boolean;
  inputError: boolean;
  multiline: boolean;
  style: TextInputProps['style'];
  onSubmitEditing: TextInputProps['onSubmitEditing'];
  onFocus: null | TextInputProps['onFocus'];
}

const InputComponent = (props: inputProps) => {
  const {
    colors,
    value,
    onChangeText,
    placeholder,
    keyboardType,
    secureTextEntry,
    inputError,
    multiline,
    style,
    onSubmitEditing,
    onFocus,
  } = props;
  return (
    <View style={{}}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: inputError ? colors.error : colors.inputBorder,
            color: inputError ? colors.error : colors.text,
            backgroundColor: colors.inputBackground,
            fontFamily: Fonts.AvenirLTStd_Medium,
          },
          style,
        ]}
        placeholder={placeholder}
        placeholderTextColor={inputError ? colors.error : '#888'}
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        onChangeText={val => {
          onChangeText(val);
        }}
        onSubmitEditing={onSubmitEditing}
        onFocus={() => {
          onFocus ? onFocus(true) : null;
        }}
      />
    </View>
  );
};

export default InputComponent;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: verticalScale(15),
    fontSize: moderateScale(14),
    minHeight: verticalScale(40),
  },
});
