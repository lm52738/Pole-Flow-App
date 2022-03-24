import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import AgendaScreen from './AgendaScreen';

export default function CalendarScreen() {
    return (
        <View style={mainStyles.safeArea}>
            <AgendaScreen />
        </View>
            
    );
}