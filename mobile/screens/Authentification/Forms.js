import React, { useState } from 'react';
import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { TextInput, RadioButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const Form = () => {
    const navigation = useNavigation();

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
    const [isSecure, setIsSecure] = useState(true);
    const [checked, setChecked] = React.useState('first');
    

    const showPassword = () => {
        setIsSecure(!isSecure);
    };

    const changeToLogin = () => {
        setIsSignup(false);
        setIsLogin(true);
    };

    const changeToSignup = () => {
        setIsLogin(false);
        setIsSignup(true);
    };

    const getMessage = () => {
        const status = isError ? `Error: ` : `Success: `;
        return status + message;
    }

    if (isLogin) {
        return (
            <View style={mainStyles.card}>
                <View style={formStyles.buttons}>
                    <TouchableOpacity style={formStyles.buttonLogin} onPress={changeToLogin}>
                        <Text style={formStyles.buttonText}>Prijava</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={formStyles.buttonSignup} onPress={changeToSignup}>
                        <Text style={formStyles.buttonText}>Registracija</Text>
                    </TouchableOpacity>
                </View>
                <View style={formStyles.form}>
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Email"  
                            activeOutlineColor='#b36cac'
                            left={<TextInput.Icon name="email"  />}
                            >
                        </TextInput>
                    </View>    
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={formStyles.input} 
                            label="Lozinka" 
                            activeOutlineColor='#b36cac' 
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                            >
                        </TextInput>
                    </View>    
                        
                    <Text style={[formStyles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={() => navigation.navigate('MainScreen')}>
                    <Text style={formStyles.buttonText}>Prijavi se</Text>
                </TouchableOpacity>
            </View>
        );
    } else if (isSignup) {
        return (
            <View style={mainStyles.card}>
                <View style={formStyles.buttons}>
                    <TouchableOpacity style={formStyles.buttonLogin} onPress={changeToLogin}>
                        <Text style={formStyles.buttonText}>Prijava</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={formStyles.buttonSignup} onPress={changeToSignup}>
                        <Text style={formStyles.buttonText}>Registracija</Text>
                    </TouchableOpacity>
                </View>
                <View style={formStyles.form}>
                <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Ime"
                            activeOutlineColor='#b36cac'
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Prezime"
                            activeOutlineColor='#b36cac'
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Broj mobitela" 
                            activeOutlineColor='#b36cac'
                            left={<TextInput.Icon name="phone"  />}
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Email"
                            activeOutlineColor='#b36cac'
                            left={<TextInput.Icon name="email"  />}>
                        </TextInput>
                    </View>    
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={formStyles.input} 
                            label="Lozinka" 
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
                            activeOutlineColor='#b36cac' 
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                            >
                        </TextInput>
                    </View>     
                    <View style={formStyles.inline}>
                        <RadioButton
                            value="first"
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                            status={ checked === 'first' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('first')}
                        /> 
                        <Text style={formStyles.radioText}>Član Kluba</Text>
                        <RadioButton
                            value="second"
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                            status={ checked === 'second' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('second')}
                        />
                        <Text style={formStyles.radioText}>Trener</Text>
                    </View>
                    <Text style={[formStyles.message, {color: isError ? 'red' : 'green'}]}>{message ? getMessage() : null}</Text>
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={() => navigation.navigate('Options')}>
                    <Text style={formStyles.buttonText}>Dalje...</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

export default Form;