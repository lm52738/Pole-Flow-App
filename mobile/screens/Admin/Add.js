import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { galleryStyles } from '../../styles/global';

export default function Add() {
    return (
        <View style={galleryStyles.card}>
            <TextInput 
                mode='flat'  
                style={galleryStyles.title} 
                label="Naslov obavijesti" 
                activeUnderlineColor='#b36cac'
                
            >
            </TextInput>
            <View style={galleryStyles.form}>
                    <View style={galleryStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={galleryStyles.input} 
                            label="" 
                            placeholder='Tekst obavijesti ...'
                            activeOutlineColor='#b36cac'
                            multiline
                            numberOfLines={8}
                        >
                        </TextInput>
                        <TextInput 
                            mode='outlined'  
                            style={galleryStyles.input} 
                            label="Datum isteka obavijesti" 
                            placeholder='Oct 12,2020'
                            activeOutlineColor='#b36cac'
                            right={<TextInput.Icon name="calendar-blank-outline"  />}
                        >
                        </TextInput>
                        <TextInput 
                            mode='outlined'  
                            style={galleryStyles.input} 
                            label="Vrijeme isteka obavijesti" 
                            placeholder='00:00'
                            activeOutlineColor='#b36cac'
                            right={<TextInput.Icon name="timer-outline"  />}
                        >
                        </TextInput>
                    </View>
            </View>
            <Divider />
            <TouchableOpacity style={galleryStyles.publish}>
                <Text style={{color: '#b36cac'}}>OBJAVI</Text>
            </TouchableOpacity>
        </View>
    );
}
