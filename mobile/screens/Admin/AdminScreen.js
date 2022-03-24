import React from 'react';
import { mainStyles } from '../../styles/global';
import NewUsers from './NewUsers';
import { View } from 'react-native';

export default function AdminScreen() {
    return (
        <View style={mainStyles.safeArea}>
            <View style={mainStyles.container}>
                <NewUsers />
            </View>
            
        </View>
    );
}