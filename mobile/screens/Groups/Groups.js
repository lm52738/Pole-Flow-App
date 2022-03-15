import React, {useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal } from 'react-native';
import { Divider } from 'react-native-paper';
import { galleryStyles, usersStyles } from '../../styles/global';
import { EvilIcons, Feather, FontAwesome5 } from '@expo/vector-icons';

export default function Groups() {
    
    const [groups, setGroups] = useState([
        { key: 1, firstName: 'Pole Flow 1'},
        { key: 2, firstName: 'Pole Flow 2'},
        { key: 3, firstName: 'Pole Flow 3'},
        { key: 4, firstName: 'Pole Flow 4'},
        { key: 5, firstName: 'Pole Flow 5'},
        { key: 6, firstName: 'Pole Flow 6'},
        { key: 7, firstName: 'Pole Flow 7'},
        { key: 8, firstName: 'Pole Flow 8'},
        { key: 9, firstName: 'Pole Flow 9'},
        { key: 10, firstName: 'Pole Flow 10'},
        { key: 11, firstName: 'Pole Flow 11'},
        { key: 12, firstName: 'Pole Flow 12'},
        { key: 13, firstName: 'Pole Flow 13'},
      ]);
      const [users, setUsers] = useState([
        { key: 1, firstName: 'Lorena', lastName:'Martinovic'},
        { key: 2, firstName: 'Marta', lastName:'Špoljarić'},
        { key: 3, firstName: 'Rebecca', lastName:'Trivett'},
        { key: 4, firstName: 'Shirley', lastName:'Lane'},
        { key: 5, firstName: 'Lulu', lastName:'Madron'},
        { key: 6, firstName: 'Elsie', lastName:'Andrews'},]);

      const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={usersStyles.users}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <View style={usersStyles.modal}>
                    <View style={usersStyles.modaltext}>
                        <Text style={usersStyles.modalLabel}>Trener:</Text>
                        <Text>Marta Špoljarić</Text>
                    </View>
                    <View style={usersStyles.modaltext}>
                        <Text style={usersStyles.modalLabel}>Razina:</Text>
                        <Text>3</Text>
                    </View>
                    <View style={usersStyles.modaltext}>
                        <Text style={usersStyles.modalLabel}>Termin treninga:</Text>
                        <Text>Uto, 19:00</Text>
                    </View>
                    <FlatList
                        data={users}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => (
                            <View>
                                <View style={usersStyles.userItem}>
                                    <EvilIcons name="user" size={24} color="black" />
                                    <Text style={usersStyles.itemText}>{ item.firstName } { item.lastName }</Text>
                                    <View style={usersStyles.itemIcon}>
                                        <TouchableOpacity>
                                            <FontAwesome5 name="times-circle" size={17} color="black" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Divider/>
                            </View>
                        )}
                    />
                </View>
                
            </Modal>


            <FlatList
                data={groups}
                keyExtractor={item => item.key}
                renderItem={({ item }) => (
                    <TouchableOpacity style={usersStyles.item} onPress={() => setModalVisible(true)}>
                        <Text style={usersStyles.itemText}>{ item.firstName }</Text>
                        <TouchableOpacity style={usersStyles.itemIcon}>
                            <Feather name="edit-2" size={15} color="black" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}