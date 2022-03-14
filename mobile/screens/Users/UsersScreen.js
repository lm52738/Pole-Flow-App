import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import Header from '../Header';
import Users from './Users';
import { mainStyles } from '../../styles/global';

export default function UsersScreen() {
    return (
        <SafeAreaView style={mainStyles.safeArea}>
            <Header />
            <Searchbar
                placeholder="Search"
            />
            <Users />
        </SafeAreaView>
    );
}