import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import CalendarAgenda from './Calendar';

export default function CalendarScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <ScrollView>
                <CalendarAgenda />
            </ScrollView>  
        </SafeAreaView>
    );
}