import {View, Text, ViewProps, TextProps} from 'react-native';
import React from 'react';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import {Fonts} from '../workers/Fonts';

interface ListTextprops {
  text: string;
  colors: object;
  style: TextProps['style'];
  numberOfLines: 1 | number;
}

const ListTextComponent = (props: ListTextprops) => {
  const {text, colors, style, numberOfLines} = props;
  return (
    <View style={{}}>
      <Text
        numberOfLines={numberOfLines ? numberOfLines : 1}
        style={[
          {
            color: colors.text,
            fontFamily: Fonts.Montserrat_Regular,
            fontSize: moderateScale(14),
            //   paddingBottom: verticalScale(8),
          },
          style,
        ]}>
        {text}
      </Text>
    </View>
  );
};

export default ListTextComponent;
