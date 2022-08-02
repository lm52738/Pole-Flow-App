import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import { Formik } from 'formik';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, TextInput } from 'react-native-paper';
import { galleryStyles, mainStyles } from '../../styles/global';

export default function Edit({ route }) {
    const { id } = route.params;

    const [authError, setAuthError] = useState(null);
    const navigation = useNavigation();
    useEffect(() => getUserData(), [])
    const [news, setNews] = useState({});

    const getUserData = async() => {
        
        await API.get('/main/news/' + id).then((response) => {
            console.log(response.data);
            setNews(response.data);
        });
    };

    const saveChanges = async (values,formikActions) => {
        console.log(values)
        setAuthError(null);

        try {
          const res = await API.post('/main/news/edit/' + id, {
              ...values
          })

          console.log(res.data);
          formikActions.resetForm();
          formikActions.setSubmitting(false);
          navigation.navigate("AdminScreen");
        } catch (err) {
          console.log(err);
          setAuthError("Invalid credentials!");
        }
    };

    return (
        <ScrollView style={mainStyles.safeArea}>
            <View style={mainStyles.container}>
                <Formik
                    enableReinitialize // missing piece!!
                    initialValues={{ 
                        id: news.idobavijest,
                        title: news.naslov,
                        text: news.tekst,
                        date: news.date,
                        time: news.time,
                        }}
                    onSubmit={saveChanges}
                >
                {({ handleChange, handleSubmit, values }) => (
                        <View style={galleryStyles.card}>
                            <TextInput 
                                mode='flat'  
                                style={galleryStyles.title} 
                                label="Naslov obavijesti" 
                                value={values.title}
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
                                        value={values.text}
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
                                        value={ values.date}
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
                                        value={values.time}
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
                                <Text style={{color: '#b36cac'}}>UREDI</Text>
                            </TouchableOpacity>
                        </View>
                )}
                </Formik>
            </View>
        </ScrollView>
    );
}
