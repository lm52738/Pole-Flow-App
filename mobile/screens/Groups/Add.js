import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider, RadioButton, TextInput } from 'react-native-paper';
import { formStyles, galleryStyles } from '../../styles/global';

export default function Add() {

    const [value, setValue] = React.useState('first');

    return (
        <View style={galleryStyles.card}>
            <Text>Stvori novu grupu</Text>
            <View style={galleryStyles.form}>
                    <View style={galleryStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={galleryStyles.input} 
                            label="Ime" 
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
                    </View>
                    <RadioButton.Group  onValueChange={newValue => setValue(newValue)} value={value}>
                        <View>
                            <RadioButton
                                value="first"
                                color='#b36cac'
                                uncheckedColor='#b36cac'
                            /> 
                            <Text style={formStyles.radioText}>Pole Flow</Text>
                        </View>
                        <View>
                            <RadioButton
                                value="second"
                                color='#b36cac'
                                uncheckedColor='#b36cac'
                            /> 
                            <Text style={formStyles.radioText}>Pole Flow Dupli</Text>
                        </View>
                        <View>
                            <RadioButton
                                value="third"
                                color='#b36cac'
                                uncheckedColor='#b36cac'
                            /> 
                            <Text style={formStyles.radioText}>Exotic Flow</Text>
                        </View>
                        <View>
                            <RadioButton
                                value="fourth"
                                color='#b36cac'
                                uncheckedColor='#b36cac'
                            /> 
                            <Text style={formStyles.radioText}>Fleksibilnost</Text>
                        </View>
                    </RadioButton.Group>
            </View>
            <Divider />
            <TouchableOpacity style={galleryStyles.publish}>
                <Text style={{color: '#b36cac'}}>OBJAVI</Text>
            </TouchableOpacity>
        </View>
    );
}