import React, { useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { formStyles, mainStyles, tableStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function Options() {
  const navigation = useNavigation();

  // const [day, setDay] = useState({ key: '', name: '', pressed:false});
  
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
          term.days.forEach ((d) => d.key == day.key ? d.pressed = true : console.log(d.key))
        }
      }
    );
    console.log(terms);
    alert('Odabrali ste ovu opciju!');
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


                        {/* <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title} >
                              <Text>{term.since} - {term.until}</Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>{term.since} - {term.until}</Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>{term.since} - {term.until}</Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>{term.since} - {term.until}</Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>{term.since} - {term.until}</Text>
                          </DataTable.Title>
                        </TouchableOpacity> */}

                    </DataTable.Row>
                ))}
              
            </DataTable>

            <TouchableOpacity style={formStyles.buttonSubmit} onPress={() => navigation.navigate('MainScreen')}>
              <Text style={formStyles.buttonText} >Registriraj se</Text>
            </TouchableOpacity>
      </View>
      
    </SafeAreaView>
    );
}