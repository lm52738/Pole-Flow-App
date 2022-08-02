import React from 'react';
import Users from './Users';
import { mainStyles } from '../../styles/global';
import { View } from 'react-native';

export default function UsersScreen() {
    return (
        <View style={mainStyles.safeArea}>
            <Users />
        </View>
    );
}