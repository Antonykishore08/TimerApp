import {View, Text, Dimensions, StyleSheet} from 'react-native';
import React, {useContext} from 'react';
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {AuthContext} from '../context/Context';
import {darkColors, lightColors} from '../workers/colors';
import SettingScreen from '../screens/SettingScreen';

import {moderateScale, moderateVerticalScale} from 'react-native-size-matters';
import {Ionicons, MaterialIcons} from '../workers/icons';
import TimerScreen from '../screens/TimerScreen';
import TimerListScreen from '../screens/TimerListScreen';
import HistoryScreen from '../screens/HistoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TimerStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          // headerLeft: ()=> null,
          // gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        <Stack.Screen name="TimerListScreen" component={TimerListScreen} />
      </Stack.Navigator>
    </>
  );
};
const SettingsStack = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          // headerLeft: ()=> null,
          // gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
      </Stack.Navigator>
    </>
  );
};
const TabNavigation = () => {
  const {DarkMode} = useContext(AuthContext);
  const colors = DarkMode ? darkColors : lightColors;
  const getTabBarVisibility = route => {
    const routeNames = getFocusedRouteNameFromRoute(route);
    if (routeNames == 'EditDetails') {
      return 'none';
    }

    return 'flex';
  };

  return (
    <Tab.Navigator
      swipeEnabled={false}
      animationEnabled={true}
      showLabel={true}
      tabBarPosition="bottom"
      screenOptions={{
        tabBarInactiveTintColor: colors.white,
        tabBarActiveTintColor: colors.primary,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {},
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarStyle: {},
      }}>
      <Tab.Screen
        name="Home"
        component={TimerScreen}
        options={({route}) => ({
          tabBarStyle: [
            styles.tabBarStyle,
            {
              display: getTabBarVisibility(route),
              backgroundColor: colors.tabBackground,
            },
          ],
          tabBarIcon: ({color}) => (
            <MaterialIcons name="home" size={moderateScale(25)} color={color} />
          ),
        })}
      />

      <Tab.Screen
        name="Timer"
        component={TimerStack}
        options={({route}) => ({
          tabBarStyle: [
            styles.tabBarStyle,
            {
              display: getTabBarVisibility(route),
              backgroundColor: colors.tabBackground,
            },
          ],
          tabBarIcon: ({color}) => (
            <MaterialIcons
              name="history"
              size={moderateScale(25)}
              color={color}
            />
          ),
        })}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Timer', {screen: 'TimerListScreen'});
          },
        })}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={({route}) => ({
          tabBarStyle: [
            styles.tabBarStyle,
            {
              display: getTabBarVisibility(route),
              backgroundColor: colors.tabBackground,
            },
          ],
          tabBarIcon: ({color}) => (
            <Ionicons
              name="settings-outline"
              size={moderateScale(25)}
              color={color}
            />
          ),
        })}
        listeners={({navigation, route}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('Settings', {screen: 'SettingScreen'});
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0,
    backgroundColor: 'red',
  },
  icon: {
    height: 30,
    width: 30,
  },
  tabBarStyle: {
    height: moderateVerticalScale(50),
    paddingBottom: 8,
    borderTopWidth: 0,
    paddingTop: 8,
  },
});
