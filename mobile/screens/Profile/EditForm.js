import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formStyles, mainStyles } from '../../styles/global';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import { Formik } from 'formik';
import { getUser } from "../../shared/Utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Yup from 'yup';

 const shema = Yup.object().shape({
   firstName: Yup.string().min(0, 'Prekratko!').max(50, 'Predugo!').required('Obavezno!'),
   lastName: Yup.string().min(0, 'Prekratko!').max(50, 'Predugo!').required('Obavezno!'),
   mail: Yup.string().email('Email nije validan!').required('Obavezno!'),
   phone: Yup.string().length(10, 'Broj mobitela nije validan!').matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    "Broj mobitela nije validan!"
  ).required('Obavezno!'),
   dateOfBirth: Yup.date().max(new Date(), "Datum rođenja mora biti stariji od današnjeg datuma").required('Required'),
   password: Yup.string().matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Mora sadržavati 8 znakova, jedno veliko slovo, jedno malo slovo, jednu znamenku i jedan poseban znak!"
  ).required('Obavezno!'),
 });

const EditForm = () => {
    const navigation = useNavigation();
    const [authError, setAuthError] = useState(null);
    const [thisUser,setThisUser] = useState({});

    useEffect(() => fetchAsyncUser(), [])

    const fetchAsyncUser = async() => {
        try {
            const user = await getUser();
            console.log("fetch");
            setThisUser(user.user);
            console.log(thisUser);
        } catch (error) {
            console.log(error);
        }
    };

    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    const [isSecure, setIsSecure] = useState(true);
    

    const showPassword = () => {
        setIsSecure(!isSecure);
    };

    const saveChanges = async (values,formikActions) => {
        console.log(values)
        setAuthError(null);

        try {
          const res = await API.post('/profile', {
              ...values
          })

          console.log(res.data);
          formikActions.resetForm();
          formikActions.setSubmitting(false);
    
          if (res.data.token) {
            await AsyncStorage.setItem("user", JSON.stringify(res.data));
            navigation.navigate('ProfileScreen');
          }

        } catch (err) {
          console.log(err);
          setAuthError("Invalid credentials!");
        }
    };
    
    return (
        <Formik
            enableReinitialize // missing piece!!
            initialValues={{ 
                id: thisUser.id,
                firstName: thisUser.firstName, 
                lastName: thisUser.lastName, 
                phone:thisUser.phone,
                mail: thisUser.mail, 
                password:'', 
                verifyPassword:'', 
                dateOfBirth: thisUser.dateOfBirth
            }}
            validationSchema={shema}
            onSubmit={saveChanges}
        >
        {({ handleChange, handleSubmit, values }) => (
            <View style={mainStyles.card}>
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
                    { authError != null && <Text color="red.400">{authError}</Text>}
                </View>
                <TouchableOpacity style={formStyles.buttonSubmit} onPress={handleSubmit}>
                    <Text style={formStyles.buttonText}>Spremi</Text>
                </TouchableOpacity>
            </View>
        )}
        </Formik>
    );
};

export default EditForm;