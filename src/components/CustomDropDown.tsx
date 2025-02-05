import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import {Fonts} from '../workers/Fonts';
import {AntDesign, MaterialCommunityIcons} from '../workers/icons';

interface DropdownProps {
  colors: object;
  style: ViewProps['style'];
  data: Array;
  placeholder: string;
  value: object;
  onChange: Function;
  special: boolean;
  hideClose: boolean;
  dropdownPosition?: 'auto' | 'top' | 'bottom';
}

const CustomDropDown = (props: DropdownProps) => {
  const {
    colors,
    style,
    data,
    placeholder,
    value,
    onChange,
    special,
    hideClose,
    dropdownPosition,
  } = props;
  const selectedColor = () => {
    let selected = colors.inputBorder;
    if (value?.value == 2) {
      selected = colors.error;
    } else if (value?.value == 1) {
      selected = colors.green;
    }
    if (special) {
      return selected;
    } else {
      return colors.defaultOpp;
    }
  };
  const isSelected = value?.value ? true : false;

  return (
    <View
      style={[
        styles.buttonStyle,
        {
          borderColor: special
            ? selectedColor()
            : isSelected
            ? colors.defaultOpp
            : colors.inputBorder,
        },
        style,
      ]}>
      <Dropdown
        style={{}}
        placeholderStyle={{fontSize: moderateScale(16)}}
        selectedTextStyle={{
          fontSize: moderateScale(14),
          color: selectedColor(),
          fontFamily: Fonts.Poppins_Medium,
        }}
        iconColor={selectedColor()}
        containerStyle={{
          marginTop: verticalScale(15),
          borderRadius: 8,
          backgroundColor: colors.default,
          borderWidth: 0.5,
          borderColor: colors.inputBorder,
        }}
        activeColor={colors.inputBackground}
        itemTextStyle={{color: colors.defaultOpp}}
        data={data}
        itemContainerStyle={{marginTop: 0}}
        maxHeight={verticalScale(230)}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        placeholderStyle={{color: '#888'}}
        dropdownPosition={dropdownPosition ? dropdownPosition : 'auto'}
        value={value}
        onChange={item => {
          onChange(item);
        }}
        closeModalWhenSelectedItem={true}
        showsVerticalScrollIndicator={false}
        flatListProps={{
          contentContainerStyle: {paddingBottom: verticalScale(8)},
        }}
        renderRightIcon={() => {
          if (isSelected && !hideClose) {
            return (
              <TouchableOpacity
                onPress={() => {
                  onChange({});
                }}
                style={{padding: moderateScale(5)}}>
                <MaterialCommunityIcons
                  name="close-thick"
                  size={moderateScale(20)}
                  color={colors.error}
                />
              </TouchableOpacity>
            );
          } else {
            return (
              <AntDesign
                name="caretdown"
                size={moderateScale(18)}
                color={
                  special
                    ? selectedColor()
                    : isSelected
                    ? colors.defaultOpp
                    : colors.inputBorder
                }
              />
            );
          }
        }}
      />
    </View>
  );
};

export default CustomDropDown;

const styles = StyleSheet.create({
  buttonStyle: {
    padding: moderateScale(8),
    borderWidth: 1,
    borderRadius: 8,
    height: verticalScale(40),
    justifyContent: 'center',
  },
});
