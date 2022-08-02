import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { profileStyles, usersStyles } from '../../styles/global';
import { Feather, EvilIcons, FontAwesome5 } from '@expo/vector-icons';
import { Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';

export default function CheckArrivals({ route })  {
    const { idgrupa } = route.params;
    const { idtrening } = route.params;
    const { day } = route.params;

    const navigation = useNavigation();

    const [group, setGroup] = useState({});
    var data = { arrivals: [], absence:[]  };

    const getData = async() => {
        
        await API.get("/groups/" + idgrupa).then((response) => {
            console.log(response.data);
            setGroup(response.data);
        });
    };

    useEffect(() => getData(), [])

    data.absence = group.clanovi;

    const check = (korisnik) => async() => {
        const index = data.absence.indexOf(korisnik);
        data.absence.splice(index,1);

        if (!data.arrivals.includes(korisnik)) {
            data.arrivals.push(korisnik);
        }
        
        console.log(data.arrivals);
        console.log(data.absence);
        alertMessage();
    }

    const uncheck = (korisnik) => async() => {
        const index = data.arrivals.indexOf(korisnik);
        data.arrivals.splice(index,1);

        if (!data.absence.includes(korisnik)) {
            data.absence.push(korisnik);
        }
            
        console.log(data.arrivals);
        console.log(data.absence);
        alertMessage();
    }

    const alertMessage = () => {
        var text = '';
        data.arrivals.forEach(
            (arrival) => {
                text += arrival.ime + "\n";
            })
        
        Alert.alert('Dolaznost',text);
    }

    const submit = async()  => {
        console.log(data.arrivals);
        try {  
          const res = await API.post('/groups/arrivals/' + idtrening, {
                data
          })
          console.log(res.data);
          navigation.navigate("CalendarScreen");
    
        } catch (err) {
            console.log(err);
        }
      };

    return (
        <View style={profileStyles.container}>
            <View style={profileStyles.info}>
                <View style={profileStyles.cardWidth}>
                    <Text style={profileStyles.labelEdit}>{group.nazivgrupa}</Text>
                    <Divider />
                    <View style={profileStyles.inline}>
                        <Text style={profileStyles.text}>Trener:</Text>
                        <Text style={profileStyles.text}>{group.trener}</Text>
                    </View>
                    <View style={profileStyles.inline}>
                        <Text style={profileStyles.text}>Razina:</Text>
                        <Text style={profileStyles.text}>{group.nazivrazina}</Text>
                    </View>
                    <View style={profileStyles.inline}>
                        <Text style={profileStyles.text}>Termin treninga:</Text>
                        <Text style={profileStyles.text}>{day}, { group.vrijemepoc} - {group.vrijemezavr}</Text>
                    </View>



                    <FlatList
                        data={group.clanovi}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                                    <View key={item.idgrupa}>
                                        <View style={usersStyles.userItem}>
                                            <EvilIcons name="user" size={24} color="black" />
                                            <Text style={usersStyles.itemText}>{ item.ime }</Text>
                                            <View style={usersStyles.itemIcon}>
                                                <TouchableOpacity onPress={check(item)}>
                                                    <FontAwesome5 name="check" size={24} color="#b36cac" />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={uncheck(item)}>
                                                    <FontAwesome5 name="times" size={24} color="#b36cac" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <Divider/>
                                    </View>
                            )}
                    />

                <View style={profileStyles.inlineButtons}>
                    <TouchableOpacity style={profileStyles.inlineEdit} onPress={submit}>
                        <Text style={profileStyles.textEdit}>Spremi</Text>
                    </TouchableOpacity>
                </View>
                    


                </View>
            </View>
        </View>
    );
}