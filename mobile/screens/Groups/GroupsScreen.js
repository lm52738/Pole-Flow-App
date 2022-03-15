import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Searchbar } from 'react-native-paper';
import Header from '../Header';
import Groups from './Groups';
import { Text, TouchableOpacity } from 'react-native';
import { galleryStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

export default function GroupsScreen() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
            <Header />
            <TouchableOpacity style={galleryStyles.addButton} onPress={() => navigation.navigate('AddGroup')}>
                <Text style={{color:'black'}}>Dodaj novu grupu</Text>
            </TouchableOpacity>
            <Searchbar
                placeholder="Search"
                />
            <Groups />
        </SafeAreaView>
    );
}