import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { formStyles, galleryStyles, mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Header';
import Media from './Media';

export default function GalleryScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <Media /> 
        </SafeAreaView>
    );
}