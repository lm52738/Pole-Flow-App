import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mainStyles } from '../../styles/global';
import Header from '../Header';
import Add from './Add';

export default function AddNews() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <ScrollView>
                <View style={mainStyles.container}>
                    <Add />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}