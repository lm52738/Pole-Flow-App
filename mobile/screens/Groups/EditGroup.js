import React,{useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Divider, RadioButton, TextInput } from 'react-native-paper';
import { galleryStyles, mainStyles } from '../../styles/global';
import {Picker} from '@react-native-picker/picker';
import { Formik } from 'formik';
import MultiSelect from 'react-native-multiple-select';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';

export default function EditGroup({ route }) {
    const { id } = route.params;

    const [activity, setActivity] = React.useState('Pole Flow');
    const [day, setDay] = useState();
    const [coach, setCoach] = useState();
    const [level, setLevel] = useState();
    const [selectedMembers, setSelectedMembers] = useState([]);

  const onSelectedMembersChange = (selectedItems) => {
    // Set Selected Items
    setSelectedMembers(selectedItems);
  };

  const navigation = useNavigation();

  const [authError, setAuthError] = useState(null);
  const [members, setMembers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [group, setGroup] = useState([]);

  useEffect(() => getData(), [])

  const getData = async() => {
      await API.get('/groups/members').then((response) => {
          console.log(response.data);
          setMembers(response.data);
      });

      await API.get('/groups/coaches').then((response) => {
        console.log(response.data);
        setCoaches(response.data);
    });

    await API.get('/groups/' + id).then((response) => {
        console.log(response.data);
        setGroup(response.data);
        setCoach(response.data.trener);
        setDay(response.data.dan);
        setActivity(response.data.nazivaktivnost);
        setLevel(response.data.nazivrazina);
    });
  };


    const submitGroup = async (values,formikActions) => {
        values.level = level;
        values.day = day;
        values.coach = coach;
        values.members = selectedMembers;
        values.activity = activity;
        console.log(values);

        setAuthError(null);

        try {
          const res = await API.post('/groups/edit/' + id, {
              ...values
          })

          console.log(res.data);
          formikActions.resetForm();
          formikActions.setSubmitting(false);
          navigation.navigate('GroupsScreen');
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
                    title: group.nazivgrupa,
                    level: group.nazivrazina,
                    day: group.dan,
                    coach: group.trener,
                    beggining: group.vrijemepoc,
                    ending: group.vrijemezavr,
                    activity: group.nazivaktivnost,
                    members: []
                    }}
                onSubmit={submitGroup}
                >
                {({ handleChange, handleSubmit, values }) => (
                <View style={galleryStyles.card}>
                    <TextInput 
                        mode='flat'  
                        style={galleryStyles.title} 
                        label="Naziv grupe" 
                        activeUnderlineColor='#b36cac'
                        value={values.title}
                        activeOutlineColor='#b36cac'
                        onChangeText={handleChange('title')}
                    >
                    </TextInput>
                    <View style={galleryStyles.form}>
                        <View style={galleryStyles.inputs}>
                        <View style={galleryStyles.picker}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={level}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setLevel(itemValue)
                                    }>
                                    
                                    <Picker.Item label="Odaberite razinu" value="Odaberite razinu" enabled={false} color='#808080'/>
                                    <Picker.Item label="Begginer" value="begginer" />
                                    <Picker.Item label="Intermediate" value="intermediate" />
                                    <Picker.Item label="Advanced" value="advanced" />
                                </Picker>
                            </View>  

                            <View style={galleryStyles.picker}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={coach}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setCoach(itemValue)
                                    }>
                                    
                                    <Picker.Item label="Odaberite trenera" value="Odaberite trenera" enabled={false} color='#808080'/>

                                    { coaches.map((coach) => (
                                        <Picker.Item label={coach.ime} value={coach.ime} />
                                    ))}
                                </Picker>
                            </View>               
                            
                            <View style={galleryStyles.picker}>
                                <Picker
                                    mode='dropdown'
                                    selectedValue={day}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setDay(itemValue)
                                    }>
                                    
                                    <Picker.Item label="Odaberite dan treninga" value="Odaberite dan treninga" enabled={false} color='#808080'/>
                                    <Picker.Item label="Ponedjeljak" value="ponedjeljak" />
                                    <Picker.Item label="Utorak" value="utorak" />
                                    <Picker.Item label="Srijeda" value="srijeda" />
                                    <Picker.Item label="Četvrtak" value="četvrtak" />
                                    <Picker.Item label="Petak" value="petak" />
                                    <Picker.Item label="Subota" value="subota" />
                                    <Picker.Item label="Nedjelja" value="nedjelja" />
                                </Picker>
                            </View>
                            
                            <TextInput 
                                mode='outlined'  
                                style={galleryStyles.input} 
                                label="Vrijeme početka" 
                                placeholder='00:00'
                                value={values.beggining}
                                activeOutlineColor='#b36cac'
                                onChangeText={handleChange('beggining')}
                                right={<TextInput.Icon name="timer-outline"  />}
                            >
                            </TextInput>
                            <TextInput 
                                mode='outlined'  
                                style={galleryStyles.input} 
                                label="Vrijeme završetka" 
                                placeholder='00:00'
                                value={values.ending}
                                activeOutlineColor='#b36cac'
                                onChangeText={handleChange('ending')}
                                right={<TextInput.Icon name="timer-outline"  />}
                            >
                            </TextInput>

                            <RadioButton.Group onValueChange={newValue => setActivity(newValue)} value={activity}>
                                <RadioButton.Item 
                                    value="Pole Flow"
                                    label='Pole Flow'
                                    color='#b36cac'
                                    uncheckedColor='#b36cac'
                                />
                                <RadioButton.Item 
                                    value="Pole Flow Dupli"
                                    label='Pole Flow Dupli'
                                    color='#b36cac'
                                    uncheckedColor='#b36cac'
                                />
                                <RadioButton.Item 
                                    value="Exotic Flow"
                                    label='Exotic Flow'
                                    color='#b36cac'
                                    uncheckedColor='#b36cac'
                                />
                                <RadioButton.Item 
                                    value="Fleksibilnost"
                                    label='Fleksibilnost'
                                    color='#b36cac'
                                    uncheckedColor='#b36cac'
                                />
                            </RadioButton.Group>

                            <MultiSelect
                                itemFontSize={16}
                                items={members}
                                fontSize={16}
                                uniqueKey="id"
                                onSelectedItemsChange={onSelectedMembersChange}
                                selectedItems={selectedMembers}
                                selectText="Izaberi članove"
                                styleMainWrapper={{paddingVertical:10}} 
                                searchInputPlaceholderText="Pretraži..."
                                onChangeInput={(text) => console.log(text)}
                                tagRemoveIconColor="#b36cac"
                                tagBorderColor="#b36cac"
                                tagTextColor="#b36cac"
                                selectedItemTextColor="#b36cac"
                                selectedItemIconColor="#b36cac"
                                itemTextColor="#000"
                                displayKey="ime"
                                searchInputStyle={{color: '#b36cac',fontSize:16, paddingVertical:10,paddingHorizontal:5}}
                                submitButtonColor="#b36cac"
                                submitButtonText="Odaberi"
                                />
                        </View>
                        { authError != null && <Text color="red.400">{authError}</Text>}
                    </View>
                    <Divider />
                    <TouchableOpacity style={galleryStyles.publish} onPress={handleSubmit}>
                        <Text style={{color: '#b36cac'}}>OBJAVI</Text>
                    </TouchableOpacity>
                </View>

                )}
                </Formik>
            </View>
        </ScrollView>  
    );
}