import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

export const LoginForm = () => {

}

export const SignUpForm = () => {

}

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

    return (
        <View style={globalStyles.card}>
            <Text style={globalStyles.heading}>{isLogin ? 'Login' : 'Signup'}</Text>
            <View style={globalStyles.form}>
                <View style={globalStyles.inputs}>
                    <TextInput style={globalStyles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail}></TextInput>
                    {!isLogin && <TextInput style={globalStyles.input} placeholder="Name" onChangeText={setName}></TextInput>}
                    <TextInput secureTextEntry={true} style={globalStyles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
                    <Text style={[globalStyles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                    <TouchableOpacity style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Done</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={globalStyles.buttonAlt} onPress={onChangeHandler}>
                        <Text style={globalStyles.buttonAltText}>{isLogin ? 'Sign Up' : 'Log In'}</Text>
                    </TouchableOpacity>
                </View>    
            </View>
        </View>
    );