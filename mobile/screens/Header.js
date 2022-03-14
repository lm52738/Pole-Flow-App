import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { mainStyles } from '../styles/global';
import { FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {

    const navigation = useNavigation();

    return (
        <View style={mainStyles.header}> 
            <TouchableOpacity  onPress={() => navigation.navigate('MainScreen')}>
                <FontAwesome5 name="home" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('AdminScreen')}>
                <FontAwesome5 name="user-secret" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => navigation.navigate('CalendarScreen')}>
                <FontAwesome name="calendar" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GalleryScreen')}>
                <FontAwesome5 name="photo-video" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
                <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('UsersScreen')}>
                <Feather name="users" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('GroupsScreen')}>
                <FontAwesome5 name="users" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

export default Header;