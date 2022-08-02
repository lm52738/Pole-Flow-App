import React from 'react';
import Groups from './Groups';
import { Text, TouchableOpacity, View } from 'react-native';
import { galleryStyles, mainStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

export default function GroupsScreen() {

    const navigation = useNavigation();

    return (
        <View style={mainStyles.safeArea}>
            <TouchableOpacity style={galleryStyles.addButton} onPress={() => navigation.navigate('AddGroup')}>
                <Text style={{color:'#b36cac'}}>NOVA GRUPA</Text>
            </TouchableOpacity>
            <Groups />
        </View>
    );
}