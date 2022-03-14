import React from 'react';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import NewUsers from './NewUsers';
import { View } from 'react-native';

export default function AdminScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <View style={mainStyles.container}>
                <NewUsers />
            </View>
            
        </SafeAreaView>
    );
}