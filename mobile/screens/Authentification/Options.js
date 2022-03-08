import React, { useState } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { formStyles, mainStyles, tableStyles } from '../../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { DataTable } from 'react-native-paper';

export default function Options() {
  const navigation = useNavigation();
  const [terms, setTerms] = useState([
    { key: '1', since: '17', until:'19'},
    { key: '2', since: '19', until:'21'},
    { key: '3', since: '21', until:'23'},
  ]);
  const [days, setDays] = useState([
    { key: '1', name: 'PON'},
    { key: '2', name: 'UTO'},
    { key: '3', name: 'SRI'},
    { key: '4', name: 'ČET'},
    { key: '5', name: 'PET'},
  ]);

  const pressHandler = () => {
    alert('Odabrali ste ovu opciju!')
  };

  return (
    <SafeAreaView style={mainStyles.safeArea}>
        <View style={mainStyles.container}>
            <Text style={tableStyles.heading}>Odaberite termine za trening</Text>
            <DataTable style={tableStyles.table}>
                <DataTable.Header>

                  { days.map(day => (
                    <DataTable.Title 
                      style={tableStyles.header} 
                      key={day.key}>
                      {day.name}
                    </DataTable.Title>
                  ))}

                </DataTable.Header>

                { terms.map(term => (
                    <DataTable.Row key={term.key} style={tableStyles.row}>
                      
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>
                                {term.since} - {term.until}
                              </Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>
                              {term.since} - {term.until}
                              </Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>
                              {term.since} - {term.until}
                              </Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>
                              {term.since} - {term.until}
                              </Text>
                          </DataTable.Title>
                        </TouchableOpacity>
                        <TouchableOpacity style={tableStyles.cell} onPress={pressHandler}>
                          <DataTable.Title style={tableStyles.title}>
                              <Text>
                              {term.since} - {term.until}
                              </Text>
                          </DataTable.Title>
                        </TouchableOpacity>

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