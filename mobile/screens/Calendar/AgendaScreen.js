import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { calendarStyles } from '../../styles/global';

export default class AgendaScreen extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            items: undefined
        };
        this.loadItems = (day) => {
            const items = this.state.items || {};
            setTimeout(() => {
                for (let i = -15; i < 85; i++) {
                    const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                    const strTime = this.timeToString(time);
                    if (!items[strTime]) {
                        items[strTime] = [];
                        const numItems = Math.floor(Math.random() * 3 + 1);
                        for (let j = 0; j < numItems; j++) {
                            items[strTime].push({
                                name: 'Item for ' + strTime + ' #' + j,
                                height: Math.max(50, Math.floor(Math.random() * 150)),
                                day: strTime
                            });
                        }
                    }
                }
                const newItems = {};
                Object.keys(items).forEach(key => {
                    newItems[key] = items[key];
                });
                this.setState({
                    items: newItems
                });
            }, 1000);
        };

        this.renderItem = (reservation, isFirst) => {
            const fontSize = isFirst ? 16 : 14;
            const color = isFirst ? 'black' : '#43515c';
            return (React.createElement(TouchableOpacity, { style: [calendarStyles.item, { height: reservation.height }], onPress: () => Alert.alert(reservation.name) },
                React.createElement(Text, { style: { fontSize, color } }, reservation.name)));
        };

        this.renderEmptyDate = () => {
            return (React.createElement(View, { style: calendarStyles.emptyDate },
                React.createElement(Text, null, "This is empty date!")));
        };

        this.rowHasChanged = (r1, r2) => {
            return r1.name !== r2.name;
        };
    }

    render() {
        return (
            <Agenda
                items={this.state.items}
                loadItemsForMonth={this.loadItems}
                selected={'2022-05-08'}
                renderItem={this.renderItem}
                renderEmptyDate={this.renderEmptyDate}
                rowHasChanged={this.rowHasChanged}
                showClosingKnob={true}
                firstDay={1}
                // markingType={'period'}
                // markedDates={{
                //    '2017-05-08': {textColor: '#43515c'},
                //    '2017-05-09': {textColor: '#43515c'},
                //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
                //    '2017-05-21': {startingDay: true, color: 'blue'},
                //    '2017-05-22': {endingDay: true, color: 'gray'},
                //    '2017-05-24': {startingDay: true, color: 'gray'},
                //    '2017-05-25': {color: 'gray'},
                //    '2017-05-26': {endingDay: true, color: 'gray'}}}
                // monthFormat={'yyyy'}
                // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
                //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
                // hideExtraDays={false}
                // showOnlySelectedDayItems
            />
        )
    }
    
    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }
}