import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import AgendaScreen from './AgendaScreen';

export default function CalendarScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <AgendaScreen />
        </SafeAreaView>
    );
}