import React,{useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider, RadioButton, TextInput } from 'react-native-paper';
import { galleryStyles } from '../../styles/global';

export default function Add() {

    const [value, setValue] = React.useState('first');

    return (
        <View style={galleryStyles.card}>
            <TextInput 
                mode='flat'  
                style={galleryStyles.title} 
                label="Naziv grupe" 
                activeUnderlineColor='#b36cac'cd d
            >
            </TextInput>
            <View style={galleryStyles.form}>
                <View style={galleryStyles.inputs}>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Razina" 
                        activeOutlineColor='#b36cac' 
                    >
                    </TextInput>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Razina" 
                        activeOutlineColor='#b36cac' 
                    >
                    </TextInput>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Dan treninga" 
                        placeholder='Ponedjeljak'
                        activeOutlineColor='#b36cac'
                        right={<TextInput.Icon name="calendar-blank-outline"  />}
                    >
                    </TextInput>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Vrijeme početka" 
                        placeholder='00:00'
                        activeOutlineColor='#b36cac'
                        right={<TextInput.Icon name="timer-outline"  />}
                    >
                    </TextInput>
                    <TextInput 
                        mode='outlined'  
                        style={galleryStyles.input} 
                        label="Vrijeme završetka" 
                        placeholder='00:00'
                        activeOutlineColor='#b36cac'
                        right={<TextInput.Icon name="timer-outline"  />}
                    >
                    </TextInput>
                </View>

                <View>
                    <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
                        <RadioButton.Item 
                            value="first"
                            label='Pole Flow'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                        <RadioButton.Item 
                            value="second"
                            label='Pole Flow Dupli'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                        <RadioButton.Item 
                            value="third"
                            label='Exotic Flow'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                        <RadioButton.Item 
                            value="fourth"
                            label='Fleksibilnost'
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                        />
                    </RadioButton.Group>
                </View>
            </View>
            <Divider />
            <TouchableOpacity style={galleryStyles.publish}>
                <Text style={{color: '#b36cac'}}>OBJAVI</Text>
            </TouchableOpacity>
        </View>
    );
}