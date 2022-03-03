import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { AntDesign } from '@expo/vector-icons';
import RadioButtons from './RadioButton';

const Auth = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const onChangeHandler = () => {
        setIsLogin(!isLogin);
        setMessage('');
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    if (isLogin) {
        return (
            <View style={formStyles.card}>
                <View style={formStyles.buttons}>
                    <TouchableOpacity style={formStyles.buttonLogin} onPress={onChangeHandler}>
                        <Text style={formStyles.buttonText}>Prijava</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={formStyles.buttonSignup} onPress={onChangeHandler}>
                        <Text style={formStyles.buttonText}>Registracija</Text>
                    </TouchableOpacity>
                </View>
                <View style={formStyles.form}>
                    <View style={formStyles.inputs}>
                        <TextInput style={formStyles.input} placeholder="E-mail" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    </View>    
                    <View style={formStyles.inline}>
                        <TextInput secureTextEntry={true} style={formStyles.input} placeholder="Lozinka" onChangeText={setPassword}></TextInput>
                        <AntDesign name="eye" size={24} color="black" />
                    </View>    
                        
                    <Text style={[formStyles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={onChangeHandler}>
                    <Text style={formStyles.buttonText}>Prijavi se</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={formStyles.card}>
                <View style={formStyles.buttons}>
                    <TouchableOpacity style={formStyles.buttonLogin} onPress={onChangeHandler}>
                        <Text style={formStyles.buttonText}>Prijava</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={formStyles.buttonSignup} onPress={onChangeHandler}>
                        <Text style={formStyles.buttonText}>Registracija</Text>
                    </TouchableOpacity>
                </View>
                <View style={formStyles.form}>
                    <View style={formStyles.inputs}>
                        <TextInput style={formStyles.input} placeholder="Ime" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    </View>
                    <View style={formStyles.inputs}>
                        <TextInput style={formStyles.input} placeholder="Prezime" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    </View>
                    <View style={formStyles.inputs}>
                        <TextInput style={formStyles.input} placeholder="E-mail" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    </View>    
                    <View style={formStyles.inline}>
                        <TextInput secureTextEntry={true} style={formStyles.input} placeholder="Lozinka" onChangeText={setPassword}></TextInput>
                        <AntDesign name="eye" size={24} color="black" />
                    </View>    
                    <View style={formStyles.inputs}>
                        <TextInput style={formStyles.input} placeholder="Broj mobitela" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    </View> 
                    <RadioButtons />
                    <Text style={[formStyles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={() => alert("biraj raspored")}>
                    <Text style={formStyles.buttonText}>Dalje...</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default Auth;