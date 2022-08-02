import React, { useState } from 'react';
import { View, Text, TouchableOpacity, } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { TextInput, RadioButton, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import API from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';
import { parse } from 'date-fns';    

 const SignupSchema = Yup.object().shape({
   firstName: Yup.string().min(0, 'Prekratko!').max(50, 'Predugo!').required('Obavezno!'),
   lastName: Yup.string().min(0, 'Prekratko!').max(50, 'Predugo!').required('Obavezno!'),
   mail: Yup.string().email('Email nije validan!').required('Obavezno!'),
   phone: Yup.string().length(10, 'Broj mobitela nije validan!').matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Broj mobitela nije validan!"
  ).required('Obavezno!'),
   dateOfBirth: Yup.date().transform((value, originalValue, context) => {
    if (context.isType(value)) return value;
    return parse(originalValue, 'dd/MM/yyyy', new Date());
}).max(new Date(), "Datum rođenja mora biti stariji od današnjeg datuma").required('Obavezno'),
   password: Yup.string().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Mora sadržavati 8 znakova, jedno veliko slovo, jedno malo slovo, jednu znamenku i jedan poseban znak!"
  ).required('Obavezno!'),
 });

const Form = () => {  
    const navigation = useNavigation();

    const [authError, setAuthError] = useState(null);

    const [isLogin, setIsLogin] = useState(true);
    const [isSignup, setIsSignup] = useState(false);
    const [isSecure, setIsSecure] = useState(true); 
    const [checked, setChecked] = React.useState('Član Kluba');   

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
                
                const res = await API.post('/login', {
                    ...values
                })
                
                console.log(res.data);
                formikActions.resetForm();
                formikActions.setSubmitting(false);
            
                if (res.data.token) {
                    await AsyncStorage.setItem("user", JSON.stringify(res.data));
                }
                navigation.navigate("MainScreen");

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
        {({ handleChange, handleSubmit }) => (
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
                            activeOutlineColor='#b36cac' 
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                            >
                        </TextInput>
                    </View>    
                    { authError != null && <Text style={{color:'#e60000'}}>{authError}</Text>}
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
            values.role = checked;
            console.log(values)
            setAuthError(null);

            try {
              const res = await API.post('/signup', {
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
            initialValues={{ firstName:'', lastName:'', phone:'', mail: '', password:'', verifyPassword:'', role:checked, dateOfBirth:''}}
            onSubmit={signUp}
            validationSchema={SignupSchema}
        >
        {({ errors, touched, handleChange, handleSubmit }) => (
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
                            onChangeText={handleChange('firstName')}
                            />
                        {errors.firstName && touched.firstName ? (
                            <Text style={{color:'#e60000'}}>{errors.firstName}</Text>
                        ) : null}
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Prezime"
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('lastName')}
                        />
                        {errors.lastName && touched.lastName ? (
                            <Text style={{color:'#e60000'}}>{errors.lastName}</Text>
                        ) : null}
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Datum rođenja" 
                            placeholder='00/00/0000'
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('dateOfBirth')}
                            left={<TextInput.Icon name="calendar-blank"  />}
                        />
                        {errors.dateOfBirth && touched.dateOfBirth ? (
                            <Text style={{color:'#e60000'}}>{errors.dateOfBirth}</Text>
                        ) : null}
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            keyboardType='numeric'
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Broj mobitela" 
                            placeholder='000 0000 000'
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('phone')}
                            left={<TextInput.Icon name="phone"  />}
                        />
                        {errors.phone && touched.phone ? (
                            <Text style={{color:'#e60000'}}>{errors.phone}</Text>
                        ) : null}
                    </View> 
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined' 
                            style={formStyles.input} 
                            label="Email"
                            keyboardType='email-address'
                            activeOutlineColor='#b36cac'
                            onChangeText={handleChange('mail')}
                            left={<TextInput.Icon name="email"  />}
                        />
                        {errors.mail && touched.mail ? 
                        <Text style={{color:'#e60000'}}>{errors.mail}</Text> 
                        : null}
                    </View>    
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={formStyles.input} 
                            label="Lozinka" 
                            activeOutlineColor='#b36cac' 
                            onChangeText={handleChange('password')}
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                        />
                        {errors.password && touched.password ? (
                            <Text style={{color:'#e60000'}}>{errors.password}</Text>
                        ) : null}
                    </View>   
                    <View style={formStyles.inputs}>
                        <TextInput 
                            mode='outlined'  
                            style={formStyles.input} 
                            label="Ponovi lozinku" 
                            activeOutlineColor='#b36cac' 
                            onChangeText={handleChange('verifyPassword')}
                            secureTextEntry={isSecure ? isSecure : false} 
                            right={<TextInput.Icon name="eye" onPress={showPassword}/>}
                        />
                        {errors.password && touched.password ? (
                            <Text style={{color:'#e60000'}}>{errors.password}</Text>
                        ) : null}
                    </View>     
                    <View style={formStyles.inline}>
                        <RadioButton
                            value="Član Kluba"
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                            status={ checked === 'Član Kluba' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('Član Kluba')}
                        /> 
                        <Text style={formStyles.radioText}>Član Kluba</Text>
                        <RadioButton
                            value="Trener"
                            color='#b36cac'
                            uncheckedColor='#b36cac'
                            status={ checked === 'Trener' ? 'checked' : 'unchecked' }
                            onPress={() => setChecked('Trener')}
                        />
                        <Text style={formStyles.radioText}>Trener</Text>
                    </View>
                    { authError != null && <Text style={{color:'#e60000'}}>{authError}</Text>}
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