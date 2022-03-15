import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import EditForm from './EditForm';

export default function EditProfile() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <ScrollView>
                <View style={mainStyles.container}>
                    <EditForm />
                </View>
            </ScrollView>  
        </SafeAreaView>
    );
}