import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';

export default function GalleryScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <ScrollView>
                <View style={mainStyles.container}>
                    <Text>Slike + Videi</Text>
                </View>
            </ScrollView>  
        </SafeAreaView>
    );
}