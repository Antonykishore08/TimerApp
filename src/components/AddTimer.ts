import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { updateTimerList } from '../store/actions/appActions';
import { store } from '../store';

export interface categoryObject {
  value: string;
  label: string;
}
export interface TimerProps {
  id: string;
  name: string;
  duration: number;
  remaining: number;
  running: boolean;
  category: categoryObject;
  completedAt?: Date;
}
export const categoryList = [
    {value: 1, label: 'Work'},
    {value: 2, label: 'Break'},
    {value: 3, label: 'Gym'},
    {value: 4, label: 'Study'},
    {value: 5, label: 'Health'},
    {value: 6, label: 'Games'},
    {value: 7, label: 'Cooking'},
  ];

export const AddTimer = async(newTimer: TimerProps) => {
  const TimerList = store.getState().app.timerList;
  
  await store.dispatch(updateTimerList([...TimerList, newTimer]));
  
 
}

const styles = StyleSheet.create({})