import {React, useEffect, useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { formStyles, profileStyles } from '../../styles/global';
import { Avatar, Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getUser, logOut } from "../../shared/Utils";

export default function Profile() {
    const navigation = useNavigation();
    const [thisUser,setThisUser] = useState({});

    useEffect(() => fetchAsyncUser(), [])

    const fetchAsyncUser = async() => {
        try {
            const user = await getUser();
            console.log("fetch");
            setThisUser(user.user);
            console.log(thisUser)
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={profileStyles.container}>
            <Avatar.Image size={200} style={profileStyles.avatar} source={require('../../assets/avatar.png')} />
            <TouchableOpacity style={profileStyles.button} onPress={() => navigation.navigate('EditProfile')}>
                <Feather name="edit-2" size={24} color="white" />
            </TouchableOpacity>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ULOGA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{ thisUser.role }</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>ISKUSTVO</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{ thisUser.experiance } godina</Text>
                </View>
            </View>
            <View style={profileStyles.info}>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>BROJ MOBITELA</Text>
                    <Divider />
                    <Text style={profileStyles.text}>{thisUser.phone}</Text>
                </View>
                <View style={profileStyles.card}>
                    <Text style={profileStyles.label}>DATUM ROĐENJA</Text>
                    <Divider />
                    <Text style={profileStyles.text}> { thisUser.dateOfBirth}</Text>
                </View>
            </View>

            { thisUser.role != 'Admin' && 
                <View style={profileStyles.info}>
                    <View style={profileStyles.card}>
                        <Text style={profileStyles.label}>ČLANARINA</Text>
                        <Divider />
                        
                        { thisUser.fee !== null && thisUser.fee !== undefined && thisUser.fee.map(
                            (item) => (
                                <Text key={item.idclan} style={profileStyles.text}>{ item.iznos } / { item.placeno == 0 ? 'Neplaćeno' : 'Plaćeno'}</Text>
                            )
                        )}

                        { thisUser.fee == null && thisUser.fee !== undefined &&
                            <Text style={profileStyles.text}>Sve članarine plaćene!</Text>
                        }

                    </View>
                    <View style={profileStyles.card}>
                        <Text style={profileStyles.label}>BROJ NADOKNADA</Text>
                        <Divider />
                        <Text style={profileStyles.text}>{thisUser.compensation}</Text>
                    </View>
                </View>
            }
            
            <TouchableOpacity style={profileStyles.buttonLogout} onPress={() => { logOut();navigation.navigate("AuthScreen"); }}>
                <Text style={formStyles.buttonText}>Odjava</Text>
            </TouchableOpacity>
        </View>
    );
}