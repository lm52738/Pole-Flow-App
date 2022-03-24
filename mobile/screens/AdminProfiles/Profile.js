import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { mainStyles, profileStyles, reminderStyles } from '../../styles/global';
import { Avatar, Divider, TextInput } from 'react-native-paper';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

export default function Profile() {
    return (
        <View style={profileStyles.container}>
            <View style={profileStyles.info}>
                <View style={profileStyles.cardWidth}>
                    <Text style={profileStyles.label}>ČLANARINA</Text>
                    <Divider />
                    <View style={profileStyles.inline}>
                        <Text style={profileStyles.text}>Veljača, 2022</Text>
                        <Text style={profileStyles.text}>200 kn</Text>
                        <TouchableOpacity style={profileStyles.button2}>
                            <FontAwesome5 name="check" size={24} color="#b36cac" />
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </View>
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
                    <Text style={profileStyles.label}>IME i PREZIME</Text>
                    <Divider />
                    <Text style={profileStyles.text}>Lorena Martinović</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>DATUM ROĐENJA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>02-08-2000</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ MOBITELA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>0915263477</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ NADOKNADA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>3</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.cardWidth}>
                    <Text style={profileStyles.label}>MAIL</Text>
                    <Divider />
                    <Text style={profileStyles.text}>martinovic.lorena@gmail.com</Text>
                </View>
            </View>
        </View>
    );
}