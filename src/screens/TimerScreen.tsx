import {
  Button,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {errorBox, infoBox, ToastComponent} from '../workers/utils';
import {
  AddTimer,
  TimerProps,
  categoryList,
  categoryObject,
} from '../components/AddTimer';
import {useDispatch, useSelector} from 'react-redux';
import {updateTimerList} from '../store/actions/appActions';
import InputComponent from '../components/InputComponent';
import {AuthContext} from '../context/Context';
import {darkColors, lightColors} from '../workers/colors';
import {moderateScale} from 'react-native-size-matters';
import HeaderText from '../components/HeaderText';
import ButtonComponent from '../components/ButtonComponent';
import CustomDropDown from '../components/CustomDropDown';

const TimerScreen = ({navigation}) => {
  const [newTimerName, setNewTimerName] = useState('');
  const [newTimerDuration, setNewTimerDuration] = useState('');
  const [selectedCategory, setselectedCategory] = useState({});
  const {DarkMode}: any = useContext(AuthContext);
  const colors = DarkMode ? darkColors : lightColors;
  const TimerList = useSelector((state: any) => state.app.timerList);

  const dispatch = useDispatch();

  const addTimer = async () => {
    if (!selectedCategory?.value) {
      errorBox('Please select a category');
      return;
    } else if (!newTimerName) {
      errorBox('Please enter a valid timer name ');
      return;
    } else if (isNaN(newTimerDuration) || newTimerDuration <= 0) {
      errorBox('Please enter a valid timer duration.');
      return;
    }
    const newTimer = {
      id: Date.now().toString(),
      name: newTimerName,
      duration: parseInt(newTimerDuration, 10),
      remaining: parseInt(newTimerDuration, 10),
      running: false,
      category: selectedCategory,
    };
    await dispatch(updateTimerList([...TimerList, newTimer]));
    Keyboard.dismiss();
    infoBox('Timer added successfully');
    navigation.navigate('Timer', {screen: 'TimerListScreen'});
    setNewTimerName('');
    setNewTimerDuration('');
    setselectedCategory({});
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
        title={'Add timer'}
      />
      <View style={{flex: 1, marginTop: moderateScale(20)}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CustomDropDown
            colors={colors}
            style={{}}
            data={categoryList}
            placeholder={'Category'}
            value={selectedCategory}
            onChange={(val: categoryObject) => {
              setselectedCategory(val);
            }}
            special={false}
            hideClose={false}
          />
          <InputComponent
            colors={colors}
            value={newTimerName}
            onChangeText={setNewTimerName}
            placeholder={'Timer name'}
            keyboardType={undefined}
            secureTextEntry={false}
            inputError={false}
            multiline={false}
            style={{marginTop: moderateScale(20)}}
            onSubmitEditing={undefined}
            onFocus={undefined}
          />

          <InputComponent
            colors={colors}
            value={newTimerDuration}
            onChangeText={setNewTimerDuration}
            placeholder={'Duration (sec)'}
            keyboardType={'number-pad'}
            secureTextEntry={false}
            inputError={false}
            multiline={false}
            style={{}}
            onSubmitEditing={undefined}
            onFocus={undefined}
          />
        </ScrollView>
        <ButtonComponent
          colors={colors}
          onPress={addTimer}
          text={'Add timer'}
          style={{}}
          textStyle={{}}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default TimerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
});
