import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Agenda, AgendaItem, AgendaList, Calendar, CalendarList, CalendarProvider, ExpandableCalendar, Timeline, TimelineList, WeekCalendar } from 'react-native-calendars';
import { StatusBar } from 'expo-status-bar';
import { mainStyles } from '../../styles/global';

export default function OptionsCalendar() {

    const ITEMS = [
        {
            title: '2021-11-01',
          data: [{hour: '12am', duration: '1h', title: 'First Yoga'}]
        },
        {
            title: '2021-11-02',
          data: [
            {hour: '4pm', duration: '1h', title: 'Pilates ABC'},
            {hour: '5pm', duration: '1h', title: 'Vinyasa Yoga'}
          ]
        },
        {
            title: '2021-11-03',
          data: [
            {hour: '1pm', duration: '1h', title: 'Ashtanga Yoga'},
            {hour: '2pm', duration: '1h', title: 'Deep Stretches'},
            {hour: '3pm', duration: '1h', title: 'Private Yoga'}
          ]
        },
        {
            title: '2021-11-04',
          data: [{hour: '12am', duration: '1h', title: 'Ashtanga Yoga'}]
        },
        {
            title: '2021-11-05',
          data: [
            {hour: '9pm', duration: '1h', title: 'Middle Yoga'},
            {hour: '10pm', duration: '1h', title: 'Ashtanga'},
            {hour: '11pm', duration: '1h', title: 'TRX'},
            {hour: '12pm', duration: '1h', title: 'Running Group'}
          ]
        },
      ];
    
      const renderItem = ({item}) => {
        return <AgendaItem item={item}/>;
      };
    


    return (
        <View style={mainStyles.calendar}>
            <CalendarProvider
                date='2021-11-01'
            >
                <WeekCalendar
                    firstDay={1}
                    current={'2021-11-01'}
                    onDayPress={day => {
                        console.log('selected day', day);
                    }}
                    onDayLongPress={day => {
                        console.log('selected day', day);
                    }}
                    markedDates={{
                        '2021-11-01': {marked: true, selectedColor: 'blue'},
                        '2021-11-02': {marked: true, selectedColor: 'blue'},
                        '2021-11-03': {marked: true, selectedColor: 'blue'},
                        '2021-11-04': {marked: true, selectedColor: 'blue'},
                        '2021-11-05': {marked: true, selectedColor: 'blue'},
                    }}
                />
                <AgendaList
                    selected={'2021-11-01'}
                    //sections={ITEMS}
                    //renderItem={renderItem}
                    // scrollToNextEvent
                    // sectionStyle={styles.section}
                    // dayFormat={'YYYY-MM-d'}
                />
            </CalendarProvider>
            <StatusBar />
    </View>
    );
}