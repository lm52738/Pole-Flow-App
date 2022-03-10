import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import Header from '../Header';
import Users from './Users';

export default function UsersScreen() {
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Header />
            <Searchbar
                placeholder="Search"
            />
            <Users />
        </SafeAreaView>
    );
}