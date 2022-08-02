import React, { useEffect, useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { formStyles, mainStyles, tableStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';
import API from '../../api';
import { getUser } from '../../shared/Utils';

export default function Options() {
  const navigation = useNavigation();
  
  const [authError, setAuthError] = useState(null);
  const [user,setThisUser] = useState({});

  const fetchAsyncUser = async() => {
    try {
        const user = await getUser();
        console.log(user);
        setThisUser(user.user);

    } catch (error) {
        console.log(error);
    }
};
useEffect(() => fetchAsyncUser(), [])

  var data = { options: [] };
  
  let weekDays = [
    { key: '1', name: 'PON', pressed:false},
    { key: '2', name: 'UTO', pressed:false},
    { key: '3', name: 'SRI', pressed:false},
    { key: '4', name: 'ČET', pressed:false},
    { key: '5', name: 'PET', pressed:false},
  ];

  let terms = [
    { key: '1', since: '17', until:'19', days:[
      { key: '11', name: 'PON', pressed:false},
      { key: '12', name: 'UTO', pressed:false},
      { key: '13', name: 'SRI', pressed:false},
      { key: '14', name: 'ČET', pressed:false},
      { key: '15', name: 'PET', pressed:false},
    ]},
    { key: '2', since: '19', until:'21', days:[
      { key: '21', name: 'PON', pressed:false},
      { key: '22', name: 'UTO', pressed:false},
      { key: '23', name: 'SRI', pressed:false},
      { key: '24', name: 'ČET', pressed:false},
      { key: '25', name: 'PET', pressed:false},
    ]},
    { key: '3', since: '21', until:'23', days:[
      { key: '31', name: 'PON', pressed:false},
      { key: '32', name: 'UTO', pressed:false},
      { key: '33', name: 'SRI', pressed:false},
      { key: '34', name: 'ČET', pressed:false},
      { key: '35', name: 'PET', pressed:false},
    ]},
  ];

  const pressHandler = (termKey, day) => () => {
    console.log(termKey);
    console.log(day);

    terms.forEach(
      (term) => {
        if (term.key == termKey) {
          term.days.forEach (
            (d) => {
              const string = day.name + ": " + term.since + " - " + term.until;
              if (d.key == day.key){
                if (data.options.indexOf(string) <= -1){
                  data.options.push(string);
                } else {
                  data.options.splice(data.options.indexOf(string), 1);
                }
              }
                
            }
            )
        }
      }
    );
    console.log(data.options);
    var text = '';
    for (var option of data.options){
      text = text + option + "\n";
    }
    alert("Odabrali ste opcije \n" + text);
  };

  const submit = async()  => {
    setAuthError(null);
    try {  
      const res = await API.post('/options', {
          ...data,
          user
      })
      console.log(res.data);
      navigation.navigate("MainScreen");

    } catch (err) {
        console.log(err);
        setAuthError("Invalid credentials!");
    }
  };

  return (
    <SafeAreaView style={mainStyles.safeArea}>
        <View style={mainStyles.container}>
            <View style={tableStyles.heading}>
              <Text style={{fontSize: 16}}>Odaberite termine za trening</Text>
              <Text style={{fontSize: 16}}>koji vam odgovaraju</Text>
            </View>
          
            <DataTable style={tableStyles.table}>
                <DataTable.Header>

                  { weekDays.map(day => (
                    <DataTable.Title 
                      style={tableStyles.header} 
                      key={day.key}>
                      {day.name}
                    </DataTable.Title>
                  ))}

                </DataTable.Header>

                { terms.map(term => (
                    <DataTable.Row key={term.key} style={tableStyles.row}>
                      
                      { term.days.map(day => (
                          <TouchableOpacity style={tableStyles.cell} onPress={pressHandler(term.key, day)}>
                            <DataTable.Title style={[tableStyles.title, day.pressed ? {backgroundColor:'red'} : {backgroundColor:'white'}]} key={day.key}>
                                <Text>{term.since} - {term.until}</Text>
                            </DataTable.Title>
                          </TouchableOpacity>
                      ))}
                    </DataTable.Row>
                ))}
              
            </DataTable>

            <TouchableOpacity style={formStyles.buttonSubmit} onPress={submit}>
              <Text style={formStyles.buttonText} >Registriraj se</Text>
            </TouchableOpacity>
      </View>
      
    </SafeAreaView>
    );
}