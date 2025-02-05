import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {useSelector} from 'react-redux';
import HeaderText from '../components/HeaderText';
import {AuthContext} from '../context/Context';
import {darkColors, lightColors, width} from '../workers/colors';
import {moderateScale, verticalScale} from 'react-native-size-matters';
import ListTextComponent from '../components/ListTextComponent';
import {Fonts} from '../workers/Fonts';
import {AntDesign} from '../workers/icons';
import dayjs from 'dayjs';

const HistoryScreen = () => {
  const {DarkMode}: any = useContext(AuthContext);
  const colors = DarkMode ? darkColors : lightColors;
  const HistoryList = useSelector((state: any) => state.app.historyList);
  const renderEmpty = (colors: any) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{color: colors.text}}>No history yet</Text>
      </View>
    );
  };
  const RenderHistoryItem = (item: any, index: number) => {
    let backgroundColor = colors.listbackground_2;

    return (
      <View
        key={index?.toString()}
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 10,
          marginTop: moderateScale(5),
        }}>
        <View
          style={{
            paddingVertical: verticalScale(10),
            borderColor: colors.inputBorder,
            paddingTop: verticalScale(10),
            paddingHorizontal: moderateScale(10),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1}}>
              <Text
                style={{
                  fontSize: moderateScale(16),
                  color: colors.text,
                  textTransform: 'capitalize',
                  fontFamily: Fonts.Montserrat_SemiBold,
                }}>
                {item.name}
              </Text>
              <ListTextComponent
                text={`Completed at - ${dayjs(item.createdAt).format(
                  'DD MM YYYY hh:mm A',
                )}`}
                colors={colors}
                style={{marginTop: moderateScale(5)}}
                numberOfLines={1}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <HeaderText
        backButton={false}
        onBackPress={() => {}}
        colors={colors}
        textStyle={{}}
        title={'History'}
        showMore={false}
        onPressMore={() => {}}
      />
      <View style={{flex: 1, marginTop: moderateScale(20)}}>
        <FlatList
          data={HistoryList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => RenderHistoryItem(item, index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: moderateScale(20)}}
          ListEmptyComponent={() => renderEmpty(colors)}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
});
