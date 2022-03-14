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
                label="Naziv multimedije" 
                activeUnderlineColor='#b36cac'
                
            >
            </TextInput>
            <View style={galleryStyles.form}>
                    <View style={galleryStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={galleryStyles.input} 
                            label="Učitaj sa uređaja" 
                            activeOutlineColor='#b36cac' 
                            right={<TextInput.Icon name="upload"/>}
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
