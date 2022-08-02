import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { reminderStyles } from '../../styles/global';
import { FontAwesome5 } from '@expo/vector-icons';
import API from '../../api';

export default function Reminder() {

    const [reminder, setReminder] = useState(null);
    const [thisUser,setThisUser] = useState({});
    const [pressed, setPressed] = useState(false);

    useEffect(() => getData(), [])

    const getData = async() => {
        try {
            await API.get(`/main/reminder`).then((response) => {
                console.log(response.data);
                setReminder(response.data);
            });
        } catch (error) {
            console.log(error);
        }
    };

    const pressArrival = async() => {
        try {
            setPressed(true);
            const data = true;
            const idtrening = reminder.idtrening;

            const res = await API.post('/main/reminder/' + idtrening, {
                data
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    const pressAbsence = async() => {
        try {
            setPressed(true);
            const data = false;
            const idtrening = reminder.idtrening;
            
            const res = await API.post('/main/reminder/' + idtrening, {
                data
            });
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            { reminder != null && pressed == false &&
                <View style={reminderStyles.reminder}>
                <Text style={reminderStyles.reminderTitle}>{reminder.nazivaktivnost}</Text>
                <Text style={reminderStyles.reminderTitle}>{reminder.trajanje}</Text>
                <View style={reminderStyles.reminderButtons}>
                    <TouchableOpacity style={reminderStyles.button} onPress={pressArrival}>
                        <FontAwesome5 name="check" size={24} color="#b36cac" />
                    </TouchableOpacity>
                    <TouchableOpacity style={reminderStyles.button} onPress={pressAbsence}>
                        <FontAwesome5 name="times" size={24} color="#b36cac" />
                    </TouchableOpacity>
                </View>
                <View style={reminderStyles.divider}>
                    <Text style={reminderStyles.reminderDate}>{reminder.datum}</Text>
                    <FontAwesome5 name="calendar" size={24} color="white" style={reminderStyles.date}/>
                </View>
            </View>
            }
        </>
    );
}