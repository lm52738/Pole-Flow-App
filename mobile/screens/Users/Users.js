import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { usersStyles } from '../../styles/global';
import { EvilIcons, Feather } from '@expo/vector-icons';
import API from '../../api';
import { Searchbar } from 'react-native-paper';

export default function Users() {

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(true);
    const [users, setUsers] = useState([]);
    const [searchUsers, setSearchUsers] = useState([]);
    
    useEffect(() => getData(), [])

    const getData = async() => {
       try {
            await API.get('/users').then((response) => {
                console.log(response.data);
                setUsers(response.data);
                setSearchUsers(response.data);
            }).then((responseJson) => {
                setRefreshing(false);
                console.log(responseJson.data);
                var newdata = users.concat(responseJson.data);
                setUsers(newdata);
                setSearchUsers(newdata);
              });
       } catch (error) {
        console.log(error);
       }
  
    };

    const [searchValue, setSearchValue] = useState('');
    const searchFunction = (text) => {
        const updatedData = users.filter((item) => {
          const item_data = `${item.ime.toUpperCase()})`;
          const text_data = text.toUpperCase();
          return item_data.indexOf(text_data) > -1;
        });
        setSearchValue(text);
        setSearchUsers(updatedData);
      };


    return (
        <>
        <Searchbar
                placeholder="Pretraži korisnike..."
                lightTheme
                round
                value={searchValue}
                onChangeText={(text) => searchFunction(text)}
                autoCorrect={false}
                clearButtonMode="always"
                />
        <View style={usersStyles.users}>
            {refreshing ? <ActivityIndicator /> : null}
            <FlatList
                ListFooterComponent={<View style={{height: 1}}/>}
                data={searchUsers}
                keyExtractor={item => item.idkorisnik}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                  }
                renderItem={({ item }) => (
                    <TouchableOpacity style={usersStyles.item} onPress={() => navigation.navigate('AdminProfile', { id: item.idkorisnik })}>
                        <EvilIcons name="user" size={24} color="black" />
                        <Text style={usersStyles.itemText}>{ item.ime }</Text>
                    </TouchableOpacity>
                    
                )}
                
            />
        </View>
        </>
    );
}