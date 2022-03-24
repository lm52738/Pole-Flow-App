import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import Profile from './Profile';

export default function ProfileScreen() {
    return (
            <ScrollView style={mainStyles.safeArea}>
                <Profile />
            </ScrollView>  
    );
}