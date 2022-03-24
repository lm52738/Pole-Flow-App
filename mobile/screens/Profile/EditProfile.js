import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { mainStyles } from '../../styles/global';
import EditForm from './EditForm';

export default function EditProfile() {
    return (
            <ScrollView style={mainStyles.safeArea}>
                <View style={mainStyles.container}>
                    <EditForm />
                </View>
            </ScrollView>  
    );
}