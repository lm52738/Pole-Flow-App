import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Divider, TextInput } from 'react-native-paper';
import { galleryStyles, profileStyles } from '../../styles/global';
import { Ionicons } from '@expo/vector-icons';
import API from '../../api';
import { useNavigation } from '@react-navigation/native';


export default function Add() {
    const navigation = useNavigation();

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const nameImage = (text) => {
        setName(text);
    };

    const submitImage = async() => {
        console.log(name);
        console.log(image);

        try {
          const res = await API.post('/gallery/add', {
              name,
              image
          })

          console.log(res.data);
          navigation.navigate("GalleryScreen");
        } catch (err) {
          console.error(err);
        }
    };
    
    return (
        <View style={galleryStyles.card}>
            <TextInput 
                mode='flat'  
                style={galleryStyles.title} 
                label="Naziv multimedije" 
                activeUnderlineColor='#b36cac'
                onChangeText={nameImage}
                
            >
            </TextInput>
            <View style={galleryStyles.form}>
                    <View style={galleryStyles.inputs}>
                        <TouchableOpacity style={galleryStyles.buttonUpload} onPress={pickImage}>
                            <Text style={profileStyles.textEdit}>Odaberi sliku s uređaja </Text>
                            <Ionicons style={profileStyles.button2} name="cloud-upload-outline" size={24} color="#b36cac" />
                        </TouchableOpacity>
                    </View>
                    <View style={galleryStyles.inputs}>
                     {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    </View>
            </View>
            <Divider />
            <TouchableOpacity style={galleryStyles.publish} onPress={submitImage}>
                <Text style={{color: '#b36cac'}}>OBJAVI</Text>
            </TouchableOpacity>
        </View>
    );
}
