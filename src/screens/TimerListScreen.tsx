import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {AuthContext} from '../context/Context';
import {darkColors, lightColors, width} from '../workers/colors';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import HeaderText from '../components/HeaderText';
import {TouchableOpacity} from 'react-native';
import {TimerProps} from '../components/AddTimer';
import {updateHistoryList, updateTimerList} from '../store/actions/appActions';
import ListTextComponent from '../components/ListTextComponent';
import {Fonts} from '../workers/Fonts';
import {AntDesign, Feather, MaterialCommunityIcons} from '../workers/icons';
import ButtonComponent from '../components/ButtonComponent';
import {infoBox, layoutAnimation} from '../workers/utils';
import ReactNativeModal from 'react-native-modal';
import * as Progress from 'react-native-progress';
import dayjs from 'dayjs';

const TimerListScreen = () => {
  const [timers, setTimers] = useState([]);
  const {DarkMode, settaskName, setshowPopup}: any = useContext(AuthContext);
  const colors = DarkMode ? darkColors : lightColors;
  const TimerList = useSelector((state: any) => state.app.timerList);
  const HistoryList = useSelector((state: any) => state.app.historyList);
  const dispatch = useDispatch();
  const [selectedId, setselectedId] = useState('');
  const [deleteItem, setdeleteItem] = useState({});
  const [deleteIndex, setdeleteIndex] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [showMore, setshowMore] = useState(false);
  useEffect(() => {
    if (TimerList?.length > 0) {
      setTimers(TimerList);
    }
  }, [TimerList]);

  useEffect(() => {
    if (!timers.some((timer: TimerProps) => timer.running)) return;
    const interval = setInterval(() => {
      setTimers((prevTimers: Array) =>
        prevTimers.map((timer: TimerProps) => {
          if (timer.running && timer.remaining > 0) {
            if (timer.remaining === Math.floor(timer.duration / 2)) {
              infoBox(`${timer.name} is halfway done!`);
            }
            return {...timer, remaining: timer.remaining - 1};
          } else if (timer.running && timer.remaining === 0) {
            updateTimer(timer);
            return {...timer, running: false};
          }
          return timer;
        }),
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);

  const updateTimer = async (value: TimerProps) => {
    setshowPopup(true);
    await addHistory(value);
    setselectedId('');
    settaskName(value.name);
    setTimeout(() => {
      setshowPopup(false);
      settaskName('');
    }, 4000);
    let data = [...timers];
    data.map((timer: TimerProps) =>
      timer.id == value.id
        ? ((timer.remaining = 0), (timer.running = false))
        : timer,
    );
    dispatch(updateTimerList(data));
  };
  const addHistory = async (value: TimerProps) => {
    let completedData = value;
    completedData.completedAt = new Date();
    let historyData = HistoryList ? [...HistoryList] : [];
    historyData.push(value);
    await dispatch(updateHistoryList(historyData));
    return true;
  };
  const toggleTimer = (id: string) => {
    let data = [...timers];
    data.map((timer: TimerProps) =>
      timer.id == id ? (timer.running = !timer.running) : timer,
    );
    dispatch(updateTimerList(data));
  };
  const onPressList = async (item: object, index: number) => {
    if (item.id == selectedId) {
      setselectedId('');
      return;
    }
    await layoutAnimation();
    setselectedId(item.id);
    setdeleteItem(item);
    setdeleteIndex(index);
  };

  const resetTimer = async (id: string) => {
    let data = [...timers];
    data.map((timer: TimerProps) =>
      timer.id == id
        ? ((timer.remaining = timer.duration), (timer.running = false))
        : timer,
    );
    dispatch(updateTimerList(data));
  };
  const onPressDelete = async (id: string) => {
    let data = [...timers];
    data.splice(
      data.findIndex(x => x.id === id),
      1,
    );
    if (data?.length > 0) {
      dispatch(updateTimerList(data));
    } else {
      dispatch(updateTimerList([]));
      setTimers([]);
    }
    setselectedId('');
  };

  const RenderTimerItem = (item: TimerProps, index: number) => {
    let backgroundColor = colors.listbackground_2;

    return (
      <View key={index?.toString()} style={{}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            onPressList(item, index);
          }}
          style={{
            backgroundColor: backgroundColor,
            borderRadius: 10,
            marginTop: moderateScale(5),
          }}>
          <View
            style={{
              paddingVertical: verticalScale(10),
              // borderBottomWidth: 1,
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
                  text={`Remaining time - ${item.remaining} sec`}
                  colors={colors}
                  style={{}}
                  numberOfLines={1}
                />
                <ListTextComponent
                  text={
                    'Status' +
                    ' - ' +
                    (item.remaining == 0
                      ? 'Completed'
                      : item.running
                      ? 'Running'
                      : item.remaining == item.duration
                      ? 'Yet to start'
                      : 'Paused')
                  }
                  colors={colors}
                  style={{
                    fontFamily: Fonts.Montserrat_SemiBold,
                    fontSize: moderateScale(14),
                    color: colors.text,
                  }}
                  numberOfLines={1}
                />
                <View style={{marginTop: moderateScale(8)}}>
                  <Progress.Bar
                    progress={item.remaining / item.duration}
                    width={width - moderateScale(60) * 2}
                    unfilledColor={colors.inputBackground}
                    color={colors.primary}
                  />
                </View>
              </View>
              {item.remaining == 0 && item.running == false ? (
                <TouchableOpacity
                  disabled
                  onPress={() => toggleTimer(item.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: moderateScale(30),
                    width: moderateScale(30),
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{
                      height: moderateScale(20),
                      width: moderateScale(20),
                      backgroundColor: colors.primary,
                      borderRadius: 2,
                      marginRight: moderateScale(4),
                    }}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => toggleTimer(item.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: moderateScale(30),
                    width: moderateScale(30),
                    justifyContent: 'center',
                  }}>
                  <AntDesign
                    name={item.running ? 'pause' : 'caretright'}
                    size={item.running ? moderateScale(30) : moderateScale(28)}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              )}
            </View>
            {item.id == selectedId ? (
              <View style={{}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: moderateScale(8),
                  }}>
                  <ListTextComponent
                    text={`Total duration - ${item.duration}s`}
                    colors={colors}
                    style={{}}
                    numberOfLines={1}
                  />
                  <ListTextComponent
                    text={`Category - ${item.category?.label}`}
                    colors={colors}
                    style={{}}
                    numberOfLines={1}
                  />
                </View>
                <View
                  style={{flexDirection: 'row', marginTop: moderateScale(8)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <View style={{}}>
                      <ButtonComponent
                        colors={colors}
                        onPress={() => {
                          resetTimer(item.id);
                        }}
                        text={'Reset'}
                        style={{backgroundColor: colors.warn}}
                        Icon={() => {
                          return (
                            <AntDesign
                              name="reload1"
                              color={colors.defaultOpp}
                              size={moderateScale(16)}
                            />
                          );
                        }}
                        textStyle={{
                          color: colors.defaultOpp,
                          paddingVertical: moderateScale(10),
                        }}
                        disabled={isLoading}
                      />
                    </View>
                    <View style={{marginLeft: moderateScale(15)}}>
                      <ButtonComponent
                        colors={colors}
                        onPress={() => {
                          onPressDelete(item.id);
                        }}
                        text={'Delete'}
                        style={{backgroundColor: colors.error}}
                        Icon={() => {
                          return (
                            <Feather
                              name="trash-2"
                              color={colors.white}
                              size={moderateScale(16)}
                            />
                          );
                        }}
                        textStyle={{
                          paddingVertical: moderateScale(10),
                        }}
                        disabled={isLoading}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressResetAll = async () => {
    let data = [...timers];
    data.map(
      (timer: TimerProps) => (
        (timer.remaining = timer.duration), (timer.running = false)
      ),
    );
    dispatch(updateTimerList(data));
  };
  const onPressStartAll = async () => {
    let data = [...timers];
    data.map(
      (timer: TimerProps) => (
        (timer.remaining = timer.duration), (timer.running = true)
      ),
    );
    dispatch(updateTimerList(data));
  };
  const onPressPauseAll = async () => {
    let data = [...timers];
    data.map((timer: TimerProps) => (timer.running = false));
    dispatch(updateTimerList(data));
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
        title={'Timer List'}
        showMore={true}
        onPressMore={() => {
          setshowMore(true);
        }}
      />
      <View style={{flex: 1, marginTop: moderateScale(20)}}>
        <FlatList
          data={timers}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => RenderTimerItem(item, index)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: moderateScale(20)}}
          ListEmptyComponent={() => renderEmpty(colors)}
        />
      </View>
      <ReactNativeModal
        isVisible={showMore}
        animationInTiming={300}
        animationOutTiming={300}
        style={{margin: moderateScale(0), justifyContent: 'flex-end'}}
        onBackButtonPress={() => setshowMore(false)}
        onBackdropPress={() => setshowMore(false)}>
        <View
          style={{
            backgroundColor: colors.calenderBackground,
            padding: moderateScale(15),
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
            minHeight: moderateVerticalScale(250),
            maxHeight: moderateVerticalScale(350),
          }}>
          <View
            style={{
              height: moderateVerticalScale(7),
              width: moderateVerticalScale(50),
              backgroundColor: colors.defaultOpp,
              borderRadius: 50,
              alignSelf: 'center',
              marginBottom: moderateScale(15),
              alignItems: 'center',
            }}
          />
          <Text
            style={{
              color: colors.text,
              fontSize: moderateScale(22),
              fontFamily: Fonts.Montserrat_Bold,
              letterSpacing: 3,
            }}>
            Options
          </Text>
          <ScrollView contentContainerStyle={{marginBottom: moderateScale(20)}}>
            <View
              style={{
                marginTop: moderateScale(20),
              }}>
              <ButtonComponent
                colors={colors}
                onPress={() => {
                  onPressResetAll();
                }}
                text={'Reset All'}
                style={{}}
                textStyle={{}}
                disabled={false}
              />
              <ButtonComponent
                colors={colors}
                onPress={() => {
                  onPressStartAll();
                }}
                text={'Start All'}
                style={{marginTop: moderateScale(10)}}
                textStyle={{}}
                disabled={false}
              />
              <ButtonComponent
                colors={colors}
                onPress={() => {
                  onPressPauseAll();
                }}
                text={'Pause All'}
                style={{marginTop: moderateScale(10)}}
                textStyle={{}}
                disabled={false}
              />
            </View>
          </ScrollView>
        </View>
      </ReactNativeModal>
    </View>
  );
};

const renderEmpty = (colors: object) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: moderateScale(16),
          color: colors.text,
          fontFamily: Fonts.Montserrat_Regular,
        }}>
        No timers found
      </Text>
    </View>
  );
};
export default TimerListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
  },
});
