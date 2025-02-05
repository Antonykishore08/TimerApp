import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
  SafeAreaView,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';

import {AuthContext} from '../context/Context';
import {darkColors, height, lightColors, width} from '../workers/colors';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import Loader from '../components/Loader';
import HeaderText from '../components/HeaderText';
import DeviceInfo from 'react-native-device-info';
import RNFS from 'react-native-fs';
import {Fonts} from '../workers/Fonts';
import {errorBox, infoBox, NotificationChannel} from '../workers/utils';
import {useSelector} from 'react-redux';

const SettingScreen = (props: any) => {
  const {navigation} = props;

  let VersionNumber = DeviceInfo.getVersion();
  const {DarkMode, setDarkMode}: any = useContext(AuthContext);
  const [loading, setloading] = useState(false);
  const TimerList = useSelector((state: any) => state.app.timerList);
  const colors = DarkMode ? darkColors : lightColors;

  const exportData = async () => {
    const jsonData = TimerList;

    const filePath =
      RNFS.DownloadDirectoryPath + '/timerData_' + Date.now() + '.json';

    try {
      await RNFS.writeFile(filePath, JSON.stringify(jsonData), 'utf8');
      infoBox('JSON file exported successfully');
      console.log('JSON file has been written to:', filePath);
    } catch (error) {
      console.error('Error writing JSON to file:', error);
      errorBox('Error writing JSON to file');
    }
  };
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <Loader colors={colors} isVisible={loading} />
      <ScrollView style={{backgroundColor: 'transparent'}}>
        <HeaderText
          backButton={false}
          onBackPress={() => {}}
          colors={colors}
          textStyle={{}}
          title={'Settings'}
        />
        {/* Dark Mode Toggle */}
        <View style={[styles.settingItem, {borderColor: colors.inputBorder}]}>
          <Text style={[styles.settingText, {color: colors.text}]}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{false: colors.switchTrack, true: colors.switchTrack}}
            thumbColor={colors.primary}
            value={DarkMode}
            onValueChange={() => {
              if (DarkMode) {
                saveDarkMode('false');
                setDarkMode(false);
              } else {
                saveDarkMode('true');
                setDarkMode(true);
              }
            }}
          />
        </View>
        {/* Export data  */}
        <TouchableOpacity
          onPress={() => exportData()}
          style={[styles.settingItem, {borderColor: colors.inputBorder}]}>
          <Text style={[styles.settingText, {color: colors.text}]}>
            Export Data
          </Text>
        </TouchableOpacity>

        {/* History screen */}
        <TouchableOpacity
          onPress={() => navigation.navigate('HistoryScreen')}
          style={[styles.settingItem, {borderColor: colors.inputBorder}]}>
          <Text style={[styles.settingText, {color: colors.text}]}>
            History
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: colors.subText,
            fontSize: moderateScale(12),
            marginTop: moderateScale(5),
            alignSelf: 'flex-end',
          }}>
          V{VersionNumber}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(12),
    borderBottomWidth: 0.6,
  },
  settingText: {
    fontSize: moderateScale(16),
    fontFamily: Fonts.Montserrat_Regular,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
