import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';
import { mainStyles } from '../../styles/global';

export default function CalendarPlaner() {
    return (
        <View style={mainStyles.calendar}>
            <Calendar
                current={'2022-03-03'}
                onDayPress={day => {
                    console.log('selected day', day);
                  }}
                onDayLongPress={day => {
                    console.log('selected day', day);
                }}
                monthFormat={'yyyy MM'}
                onMonthChange={month => {
                    console.log('month changed', month);
                }}
                markedDates={{
                    '2022-05-16': {selected: true, marked: true, selectedColor: 'blue'},
                    '2022-05-17': {marked: true},
                    '2022-05-18': {marked: true, dotColor: 'red', activeOpacity: 0},
                    '2022-05-19': {disabled: true, disableTouchEvent: true}
                  }}
            />
    </View>
    );
}