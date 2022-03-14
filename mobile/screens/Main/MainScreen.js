import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import News from './News';
import Reminder from './Reminder';

export default function MainScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <ScrollView>
                <News />
                <Reminder />
            </ScrollView>  
        </SafeAreaView>
    );
}