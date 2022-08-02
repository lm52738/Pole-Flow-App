import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import News from './News';
import Reminder from './Reminder';

export default function MainScreen() {
    return (
            <ScrollView style={mainStyles.safeArea}>
                <News />
                <Reminder />
            </ScrollView>  
    );
}