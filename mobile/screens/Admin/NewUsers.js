import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { galleryStyles, usersStyles } from '../../styles/global';
import { FontAwesome5 } from '@expo/vector-icons';
import News from '../Main/News';

export default function NewUsers() {

    const [users, setUsers] = useState([
        { key: 1, firstName: 'Lorena', lastName:'Martinovic'},
        { key: 2, firstName: 'Marta', lastName:'Špoljarić'},
        { key: 3, firstName: 'Rebecca', lastName:'Trivett'},
        { key: 4, firstName: 'Shirley', lastName:'Lane'},
        { key: 5, firstName: 'Lulu', lastName:'Madron'},
    ]);

    const navigation = useNavigation();

    return (
        <View style={usersStyles.newUsers}>
            <FlatList
            ListFooterComponent={
                <>
                    <TouchableOpacity style={galleryStyles.addButton} onPress={() => navigation.navigate('AddNews')}>
                        <Text style={{color:'black'}}>Nova obavijest!</Text>
                    </TouchableOpacity>
                    <News />
                </>
            }
                data={users}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <View style={usersStyles.userItem}>
                        <Text style={usersStyles.itemText}>{ item.firstName } { item.lastName }</Text>
                        <View style={usersStyles.itemIcon}>
                            <TouchableOpacity>
                                <FontAwesome5 name="check" size={24} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={{paddingLeft:40}}>
                                <FontAwesome5 name="times-circle" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                )}
                
            />
        </View>
    );
}