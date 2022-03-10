import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import Header from '../Header';
import Groups from './Groups';

export default function GroupsScreen() {

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Header />
            <Searchbar
                placeholder="Search"
                />
            <Groups />
        </SafeAreaView>
    );
}