import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { mainStyles, reminderStyles } from '../../styles/global';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Reminder() {
    return (
            <View style={reminderStyles.reminder}>
                <Text style={reminderStyles.reminderTitle}>Regularni trening</Text>
                <Text style={reminderStyles.reminderTitle}>19:00 - 21:00</Text>
                <View style={reminderStyles.reminderButtons}>
                    {/* buttons */}
                    <TouchableOpacity style={reminderStyles.button}>
                        <FontAwesome5 name="check" size={24} color="#b36cac" />
                    </TouchableOpacity>
                    <TouchableOpacity style={reminderStyles.button}>
                        <FontAwesome5 name="times" size={24} color="#b36cac" />
                    </TouchableOpacity>
                </View>
                <View style={reminderStyles.divider}>
                    <Text style={reminderStyles.reminderDate}>May 23, 2020</Text>
                    <FontAwesome5 name="calendar" size={24} color="white" style={reminderStyles.date}/>
                </View>
            </View>
    );
}