import React, {useContext} from 'react';
import {
  createStackNavigator,
  TransitionSpecs,
  TransitionPresets,
} from '@react-navigation/stack';
import TabNavigation from './TabNavigation';
import InitialScreen from '../screens/InitialScreen';

const RootNavigation = () => {
  const Stack = createStackNavigator();

  return (
    <>
      <Stack.Navigator
        screenOptions={({route, navigation}) => ({
          headerShown: false,
          // headerLeft: ()=> null,
          // gestureEnabled: true,
          ...TransitionPresets.SlideFromRightIOS,
        })}>
        <Stack.Screen name="BottomTabNavigation" component={TabNavigation} />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigation;
