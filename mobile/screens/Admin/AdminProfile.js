import React, { useEffect, useState } from 'react';
import { RefreshControl, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { mainStyles, profileStyles } from '../../styles/global';
import {  Divider } from 'react-native-paper';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import API from '../../api';
import { useNavigation } from '@react-navigation/native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

export default function AdminProfile({ route }) {
    const { id } = route.params;

    const navigation = useNavigation();
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getUserData();
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const [user, setUser] = useState({});

    const getUserData = async() => {
        
        await API.get("/users/" + id).then((response) => {
            console.log(response.data);
            setUser(response.data)
        });
    };

    useEffect(() => getUserData(), [])

    const pressHandler = (idclan) => async() => {
        console.log(idclan)

        try {
          const res = await API.post('/users/paid/' + id, {
              idclan
          })

          console.log(res.data);
        } catch (err) {
          console.error(err);
        }
    };

    const deleteProfile = async() => {
        try {
            await API.delete('/users/' + user.idkorisnik);
            navigation.navigate("UsersScreen");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <ScrollView style={mainStyles.safeArea}
            refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
            }>
        <View style={profileStyles.container}>
            <View style={profileStyles.info}>
                <View style={profileStyles.cardWidth}>
                    <Text style={profileStyles.label}>ČLANARINA</Text>
                    <Divider />
                    { user.clanarine !== null && user.clanarine !== undefined ?
                        
                    <>
                        { user.clanarine.map(
                            (clanarina) => (
                            <View key={clanarina.idclan} style={profileStyles.inline}>
                                <Text style={profileStyles.text}>{clanarina.mjesec}</Text>
                                <Text style={profileStyles.text}>{clanarina.iznos} kn</Text>

                                <TouchableOpacity style={profileStyles.button2} onPress={pressHandler(clanarina.idclan)}>
                                    <FontAwesome5 name="check" size={24} color="#b36cac" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </>

                    :

                    <View style={profileStyles.inline}>
                        <Text style={profileStyles.textEdit}>Sve članarine plaćene!</Text>
                    </View>

                    }
                    
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ULOGA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{user.uloga}</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ISKUSTVO</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{user.iskustvo} godina</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>IME i PREZIME</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{user.ime}</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>DATUM ROĐENJA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{ user.datumrod }</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ MOBITELA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{user.brmob}</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ NADOKNADA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{user.brnadoknada}</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.cardWidth}>
                    <Text style={profileStyles.label}>MAIL</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{user.mail}</Text>
                </View>
            </View>
            <TouchableOpacity style={profileStyles.inlineEdit} onPress={deleteProfile}>
                <Text style={profileStyles.textEdit}>Obriši </Text>
                <Feather style={profileStyles.button2} name="trash-2" size={24} color="#b36cac" />
            </TouchableOpacity>
        </View>
        </ScrollView>
    );
}