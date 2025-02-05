import {
  Image,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import React from 'react';
import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {AntDesign, Entypo, Feather} from '../workers/icons';
import {height} from 'src/workers/colors';
import assets_manifest from '../components/assets_manifest';
import {Fonts} from '../workers/Fonts';
import {store} from '../store';

interface TitleProps {
  colors: object;
  textStyle: TextProps['style'];
  title: string;
  backButton: boolean;
  showMore: boolean;
  onBackPress: Function;
  onPressMore: Function;
}

const HeaderText = (props: TitleProps) => {
  const {
    colors,
    textStyle,
    title,
    backButton,
    onBackPress,
    onPressMore,
    showMore,
  } = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {backButton ? (
        <TouchableOpacity
          onPress={() => onBackPress()}
          style={{paddingRight: moderateScale(10)}}>
          <AntDesign
            name="arrowleft"
            size={moderateScale(20)}
            color={colors.defaultOpp}
          />
        </TouchableOpacity>
      ) : null}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{paddingRight: moderateScale(5)}}>
          <Image
            source={assets_manifest.logo}
            style={{
              height: moderateScale(30),
              width: moderateScale(30),
              resizeMode: 'contain',
              borderRadius: 15,
            }}
          />
        </View>
        <Text
          style={[
            {
              color: colors.primary,
              fontSize: moderateScale(20),
              // fontWeight: '700',
              fontFamily: Fonts.Montserrat_SemiBold,
            },
            textStyle,
          ]}>
          {title}
        </Text>
      </View>
      {showMore && (
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              onPressMore();
            }}>
            <Feather
              name="more-vertical"
              size={moderateScale(26)}
              color={colors.defaultOpp}
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={{width: moderateScale(10)}} />
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({});
