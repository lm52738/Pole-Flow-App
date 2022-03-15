import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usersStyles } from '../../styles/global';
import { EvilIcons, Feather } from '@expo/vector-icons';

export default function Users() {

    const [users, setUsers] = useState([
        { key: 1, firstName: 'Lorena', lastName:'Martinovic'},
        { key: 2, firstName: 'Marta', lastName:'Špoljarić'},
        { key: 3, firstName: 'Rebecca', lastName:'Trivett'},
        { key: 4, firstName: 'Shirley', lastName:'Lane'},
        { key: 5, firstName: 'Lulu', lastName:'Madron'},
        { key: 6, firstName: 'Elsie', lastName:'Andrews'},
        { key: 7, firstName: 'Lorena', lastName:'Martinovic'},
        { key: 8, firstName: 'Marta', lastName:'Špoljarić'},
        { key: 9, firstName: 'Rebecca', lastName:'Trivett'},
        { key: 10, firstName: 'Shirley', lastName:'Lane'},
        { key: 11, firstName: 'Lulu', lastName:'Madron'},
        { key: 12, firstName: 'Elsie', lastName:'Andrews'},
        { key: 13, firstName: 'Rebecca', lastName:'Trivett'},
        { key: 14, firstName: 'Shirley', lastName:'Lane'},
        { key: 15, firstName: 'Lulu', lastName:'Madron'},
        { key: 16, firstName: 'Elsie', lastName:'Andrews'},
    ]);

    const navigation = useNavigation();

    return (
        <View style={usersStyles.users}>
            <FlatList
                data={users}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <TouchableOpacity style={usersStyles.item} onPress={() => navigation.navigate('AdminProfiles')}>
                        <EvilIcons name="user" size={24} color="black" />
                        <Text style={usersStyles.itemText}>{ item.firstName } { item.lastName }</Text>
                        <View style={usersStyles.itemIcon}>
                            <TouchableOpacity>
                                <Feather name="trash-2" size={15} color="black" />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                    
                )}
                
            />
        </View>
    );
}