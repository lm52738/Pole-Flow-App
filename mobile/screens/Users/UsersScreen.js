import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import Users from './Users';
import { mainStyles } from '../../styles/global';
import { View } from 'react-native';

export default function UsersScreen() {
    return (
        <View style={mainStyles.safeArea}>
            <Searchbar
                placeholder="Search"
            />
            <Users />
        </View>
    );
}