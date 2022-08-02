import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import { Formik } from 'formik';
import { View, Text, TouchableOpacity } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { galleryStyles } from '../../styles/global';

export default function Add() {

    const [authError, setAuthError] = useState(null);
    const navigation = useNavigation();

    const publish = async (values,formikActions) => {
        console.log(values)
        setAuthError(null);

        try {
          const res = await API.post('/main/news/add', {
              ...values
          })

          console.log(res.data);
          formikActions.resetForm();
          formikActions.setSubmitting(false);
          navigation.navigate("AdminScreen");
        } catch (err) {
          console.error(err);
          setAuthError("Invalid credentials!");
        }
    };

    return (
        <Formik
            initialValues={{ title:'', text:'', date:'', time: ''}}
            onSubmit={publish}
        >
        {({ handleChange, handleSubmit, values }) => (
                <View style={galleryStyles.card}>
                    <TextInput 
                        mode='flat'  
                        style={galleryStyles.title} 
                        label="Naslov obavijesti" 
                        onChangeText={handleChange('title')}
                        activeUnderlineColor='#b36cac'
                        
                    >
                    </TextInput>
                    <View style={galleryStyles.form}>
                        <View style={galleryStyles.inputs}>
                            <TextInput 
                                mode='outlined'  
                                style={galleryStyles.input} 
                                label="" 
                                onChangeText={handleChange('text')}
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
                                onChangeText={handleChange('date')}
                                placeholder='00/00/0000'
                                activeOutlineColor='#b36cac'
                                right={<TextInput.Icon name="calendar-blank-outline"  />}
                            >
                            </TextInput>
                            <TextInput 
                                mode='outlined'  
                                style={galleryStyles.input} 
                                label="Vrijeme isteka obavijesti" 
                                onChangeText={handleChange('time')}
                                placeholder='00:00'
                                activeOutlineColor='#b36cac'
                                right={<TextInput.Icon name="timer-outline"  />}
                            >
                            </TextInput>
                        </View>
                    </View>
                    { authError != null && <Text color="red.400">{authError}</Text>}
                    <Divider />
                    <TouchableOpacity style={galleryStyles.publish} onPress={handleSubmit}>
                        <Text style={{color: '#b36cac'}}>OBJAVI</Text>
                    </TouchableOpacity>
                </View>
        )}
        </Formik>
    );
}
