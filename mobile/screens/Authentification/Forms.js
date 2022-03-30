import React, { useState } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { TextInput, RadioButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Form = () => {  
    const navigation = useNavigation();

    const server = axios.create({ baseURL: "http://192.168.100.34:5000"});

    const [authError, setAuthError] = useState(null);

    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
    const [isSecure, setIsSecure] = useState(true); 
    const [checked, setChecked] = React.useState('clan');   

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

    if (isLogin) {

        const logIn = async (values,formikActions) => {
            console.log(values)
            setAuthError(null);

            try {
              const res = await server.post('/login', {
                  ...values
              })

              console.log(res.data);
              formikActions.resetForm();
              formikActions.setSubmitting(false);
        
              if (res.data.token) {
                await AsyncStorage.setItem("user", JSON.stringify(res.data));
                navigation.navigate('MainScreen');
              }

            } catch (err) {
              console.log(err);
              setAuthError("Invalid credentials!");
            }
        };




        return (
        <Formik
            initialValues={{ mail: '', password:'' }}
            onSubmit={logIn}
        >
        {({ handleChange, handleSubmit, values }) => (
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
                            onChangeText={handleChange('mail')}
                            mode='outlined' 
                            keyboardType='email-address'
                            style={formStyles.input} 
                            label="Email"  
                            value={values.mail}
                            activeOutlineColor='#b36cac'
                            left={<TextInput.Icon name="email"  />}
                            >
                        </TextInput>
                    </View>    
                    <View style={formStyles.inputs}>
                        <TextInput 
                            onChangeText={handleChange('password')}
                            mode='outlined'  
                            style={formStyles.input} 
                            label="Lozinka" 
                            value={values.password}
                            activeOutlineColor='#b36cac' 
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                            >
                        </TextInput>
                    </View>    
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={formStyles.buttonText}>Prijavi se</Text>
                </TouchableOpacity>
            </View>
        )}
        </Formik>
    );

    } else if (isSignup) {

        const signUp = async (values,formikActions) => {
            console.log(values)
            setAuthError(null);

            try {
              const res = await server.post('/signup', {
                  ...values
              })

              console.log(res.data);
              formikActions.resetForm();
              formikActions.setSubmitting(false);
        
              if (res.data.token) {
                await AsyncStorage.setItem("user", JSON.stringify(res.data));
                navigation.navigate('Options');
              }

            } catch (err) {
              console.log(err);
              setAuthError("Invalid credentials!");
            }
        };

        return (
        <Formik
            initialValues={{ firstName:'', lastName:'', phone:'', mail: '', password:'', verifyPassword:'', role:'', dateOfBirth:''}}
            onSubmit={signUp}
        >
        {({ handleChange, handleSubmit, values }) => (
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
                            value={values.firstName}
                            label="Ime"
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('firstName')}
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Prezime"
                            value={values.lastName}
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('lastName')}
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            keyboardType='numeric'
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Datum rođenja" 
                            value={values.dateOfBirth}
                            placeholder='00/00/0000'
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('dateOfBirth')}
                            left={<TextInput.Icon name="calendar-blank"  />}
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            keyboardType='numeric'
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Broj mobitela" 
                            value={values.phone}
                            placeholder='000 0000 000'
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('phone')}
                            left={<TextInput.Icon name="phone"  />}
                            >
                        </TextInput>
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Email"
                            keyboardType='email-address'
                            value={values.mail}
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('mail')}
                            left={<TextInput.Icon name="email"  />}>
                        </TextInput>
                    </View>    
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={formStyles.input} 
                            label="Lozinka" 
                            value={values.password}
                            activeOutlineColor='#b36cac' 
                            onChangeText={handleChange('password')}
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
                            value={values.verifyPassword}
                            activeOutlineColor='#b36cac' 
                            onChangeText={handleChange('verifyPassword')}
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                            >
                        </TextInput>
                    </View>     
                    <View style={formStyles.inline}>
                        <RadioButton
                            value="clan"
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                            status={ checked === 'clan' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('clan')}
                        /> 
                        <Text style={formStyles.radioText}>Član Kluba</Text>
                        <RadioButton
                            value="trener"
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                            status={ checked === 'trener' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('trener')}
                        />
                        <Text style={formStyles.radioText}>Trener</Text>
                    </View>
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={formStyles.buttonText}>Dalje...</Text>
                </TouchableOpacity>
            </View>
        )}
        </Formik>
    );
    }
};

export default Form;