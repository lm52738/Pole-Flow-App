import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { mainStyles, profileStyles } from '../../styles/global';
import { Avatar, Divider } from 'react-native-paper';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Profile() {

    const navigation = useNavigation();

    return (
        <View style={profileStyles.container}>
            <Avatar.Image size={200} style={profileStyles.avatar} source={require('../../assets/avatar.png')} />
            <TouchableOpacity style={profileStyles.button} onPress={() => navigation.navigate('EditProfile')}>
                <Feather name="edit-2" size={24} color="white" />
            </TouchableOpacity>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ULOGA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>Član kluba</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ISKUSTVO</Text>
                    <Divider />
                    <Text style={profileStyles.text}>3 godine</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ MOBITELA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>0915263477</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>DATUM ROĐENJA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>02-08-2000</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ČLANARINA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>200 kn / Plaćeno</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ NADOKNADA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>3</Text>
                </View>
            </View>
        </View>
    );
}