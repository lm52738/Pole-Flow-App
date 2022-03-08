import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import Heading from './Heading';
import Form from './Forms';
import { mainStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';

const AuthScreen = () => {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <ScrollView>
                <View style={mainStyles.container}>
                    <Heading />
                    <Form />
                </View>
            </ScrollView>  
        </SafeAreaView>
        
    );
};

export default AuthScreen;