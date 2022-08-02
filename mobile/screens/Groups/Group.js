import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { profileStyles, usersStyles } from '../../styles/global';
import { Divider } from 'react-native-paper';
import { EvilIcons, Feather, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';

export default function Group({ route }) {
    const { id } = route.params;
    const navigation = useNavigation();
    
    const [group, setGroup] = useState([]);
  
    const getData = async() => {    
      await API.get('/groups/' + id).then((response) => {
          console.log(response.data);
          setGroup(response.data);
      });
    };
  
    useEffect(() => getData(), [])

    const deleteGroup = async() => {
        try {
            await API.delete('/groups/' + group.idgrupa);
            navigation.navigate("GroupsScreen");
        } catch (err) {
            console.error(err);
        }
    }

    const deleteMember = (idkorisnik) => async() => {
        try {
            await API.post('/groups/delete/member', {
                id,
                idkorisnik
            });
            navigation.navigate("GroupsScreen");
        } catch (err) {
            console.error(err);
        }
    }

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
                        <Text style={profileStyles.text}>{group.dan}, { group.vrijemepoc} - {group.vrijemezavr}</Text>
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
                                        <TouchableOpacity onPress={deleteMember(item.id)}>
                                            <FontAwesome5 name="times-circle" size={17} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Divider/>
                            </View>
                        )}
                    />

                <View style={profileStyles.inlineButtons}>
                    <TouchableOpacity style={profileStyles.inlineEdit} onPress={() => navigation.navigate('EditGroup', { id: group.idgrupa })}>
                        <Text style={profileStyles.textEdit}>Uredi </Text>
                        <Feather style={profileStyles.button2} name="edit-2" size={24} color="#b36cac" />
                    </TouchableOpacity>

                    <TouchableOpacity style={profileStyles.inlineEdit} onPress={deleteGroup}>
                        <Text style={profileStyles.textEdit}>Obriši </Text>
                        <Feather style={profileStyles.button2} name="trash-2" size={24} color="#b36cac" />
                    </TouchableOpacity>
                </View>
                    


                </View>
            </View>
        </View>
    );
}

