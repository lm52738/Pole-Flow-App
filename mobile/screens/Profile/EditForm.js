import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { TextInput, RadioButton } from 'react-native-paper';

const EditForm = () => {

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isSecure, setIsSecure] = useState(true);
    const [checked, setChecked] = React.useState('first');
    

    const showPassword = () => {
        setIsSecure(!isSecure);
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }
    
    return (
        <View style={mainStyles.card}>
            <View style={formStyles.form}>
            <View style={formStyles.inputs}>
                    <TextInput 
                        mode='outlined' 
                        style={formStyles.input} 
                        placeholder='Lorena'
                        activeOutlineColor='#b36cac'
                        >
                    </TextInput>
                </View> 
                <View style={formStyles.inputs}>
                    <TextInput 
                        mode='outlined' 
                        style={formStyles.input} 
                        placeholder='Martinović'
                        activeOutlineColor='#b36cac'
                        >
                    </TextInput>
                </View> 
                <View style={formStyles.inputs}>
                    <TextInput 
                        mode='outlined' 
                        style={formStyles.input} 
                        placeholder='092 2462 038'
                        activeOutlineColor='#b36cac'
                        left={<TextInput.Icon name="phone"  />}
                        >
                    </TextInput>
                </View> 
                <View style={formStyles.inputs}>
                    <TextInput 
                        mode='outlined' 
                        style={formStyles.input} 
                        placeholder='martinovic.lorena@gmail.com'
                        activeOutlineColor='#b36cac'
                        left={<TextInput.Icon name="email"  />}>
                    </TextInput>
                </View>    
                <View style={formStyles.inputs}>
                    <TextInput 
                        mode='outlined'  
                        style={formStyles.input} 
                        label="Lozinka" 
                        placeholder='sifra123'
                        activeOutlineColor='#b36cac' 
                        secureTextEntry={isSecure ? isSecure : false} 
                        right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                        >
                    </TextInput>
                </View>   
                <View style={formStyles.inputs}>
                    <TextInput 
                        mode='outlined'  
                        style={formStyles.input} 
                        label="Ponovi lozinku" 
                        placeholder='sifra123'
                        activeOutlineColor='#b36cac' 
                        secureTextEntry={isSecure ? isSecure : false} 
                        right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                        >
                    </TextInput>
                </View>     
                <Text style={[formStyles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
            </View>
            <TouchableOpacity style={formStyles.buttonSubmit} onPress={() => navigation.navigate('ProfileScreen')}>
                <Text style={formStyles.buttonText}>Spremi</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditForm;