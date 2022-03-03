import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import Heading from './Heading';
import Auth from './Auth';
import { mainStyles } from '../../styles/global';

const AuthScreen = () => {
    return (
        <View style={mainStyles.container}>
            <Heading />
            <Auth />
        </View>
    );
};

export default AuthScreen;