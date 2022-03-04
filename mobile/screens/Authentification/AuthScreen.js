import React from 'react';
import { FlatList, ScrollView, View, SafeAreaView } from 'react-native';
import Heading from './Heading';
import Auth from './Auth';
import { mainStyles } from '../../styles/global';

const AuthScreen = () => {
    return (
        <SafeAreaView style={mainStyles.container}>
            <Heading />
            <Auth />
        </SafeAreaView>
    );
};

export default AuthScreen;