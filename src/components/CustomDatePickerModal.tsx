import {StyleSheet, Text, View, ViewProps} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import DateTimePicker from 'react-native-ui-datepicker';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import dayjs from 'dayjs';
import ButtonComponent from './ButtonComponent';

interface DatePickerProps {
  isVisible: boolean;
  style: ViewProps['style'];
  date: React.SetStateAction<dayjs.Dayjs> | Date;
  onChange: Function;
  colors: object;
  setisVisible: Function;
  maxDate: React.SetStateAction<dayjs.Dayjs> | string;
  minDate: string | React.SetStateAction<dayjs.Dayjs>;
  timePicker: boolean;
}

const CustomDatePickerModal = (props: DatePickerProps) => {
  const {
    isVisible,
    style,
    date,
    onChange,
    colors,
    setisVisible,
    maxDate,
    minDate,
    timePicker,
  } = props;
  if (isVisible) {
    const closeModal = () => {
      setTimeout(() => {
        setisVisible(false);
      }, 300);
    };
    return (
      <View>
        <ReactNativeModal
          isVisible={isVisible}
          animationInTiming={300}
          animationOutTiming={300}
          style={{margin: moderateScale(10)}}
          onBackButtonPress={() => closeModal()}
          onBackdropPress={() => closeModal()}>
          <View
            style={[
              {
                backgroundColor: colors.calenderBackground,
                borderRadius: 10,
                paddingHorizontal: scale(10),
                paddingVertical: verticalScale(8),
                borderWidth: 0.5,
                borderColor: colors.inputBorder,
              },
              style,
            ]}>
            <DateTimePicker
              timePicker={timePicker}
              mode="single"
              date={date}
              onChange={params => {
                const isSameDay = dayjs(params.date).isSame(dayjs(date), 'day');
                if (isSameDay) {
                } else {
                  closeModal();
                }
                onChange(params.date);
              }}
              maxDate={maxDate ? maxDate : null}
              minDate={minDate ? minDate : null}
              calendarTextStyle={{color: colors.defaultOpp}}
              selectedTextStyle={{color: colors.white}}
              headerTextStyle={{color: colors.defaultOpp}}
              weekDaysTextStyle={{color: colors.defaultOpp}}
              timePickerTextStyle={{color: colors.defaultOpp}}
              selectedItemColor={colors.primary}
              timePickerIndicatorStyle={{backgroundColor: colors.primary}}
              headerButtonColor={colors.defaultOpp}
              yearContainerStyle={{
                backgroundColor: colors.calenderBackground,
                borderWidth: 0,
              }}
              timePickerContainerStyle={{
                backgroundColor: colors.calenderBackground,
                borderWidth: 0,
                color: '#fff',
              }}
              monthContainerStyle={{
                backgroundColor: colors.calenderBackground,
                borderWidth: 0,
              }}
            />
            <ButtonComponent
              colors={colors}
              onPress={() => {
                setisVisible(false);
              }}
              text={'Done'}
              style={{alignSelf: 'flex-end'}}
              Icon={null}
              textStyle={undefined}
              disabled={false}
            />
          </View>
        </ReactNativeModal>
      </View>
    );
  }
};

export default CustomDatePickerModal;

const styles = StyleSheet.create({});
