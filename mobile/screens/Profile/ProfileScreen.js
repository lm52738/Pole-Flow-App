import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';

export default function ProfileScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <ScrollView>
                <View style={mainStyles.container}>
                    <Text>Obavijesti + podsjetnik</Text>
                    <Text> ili </Text>
                    <Text>Neodobreni korisnici</Text>
                </View>
            </ScrollView>  
        </SafeAreaView>
    );
}