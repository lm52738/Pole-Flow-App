import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, ActivityIndicator, RefreshControl } from 'react-native';
import { Divider } from 'react-native-paper';
import { galleryStyles, usersStyles } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import { Searchbar } from 'react-native-paper';

export default function Groups() {

    const navigation = useNavigation();

    const [refreshing, setRefreshing] = useState(true);
    const [groups, setGroups] = useState([]);
    const [searchGroups, setSearchGroups] = useState([]);
    
    useEffect(() => getData(), [])

    const getData = async() => {
       try {
            await API.get('/groups').then((response) => {
                console.log(response.data);
                setGroups(response.data);
                setSearchGroups(response.data);
            }).then((responseJson) => {
                setRefreshing(false);
                var newdata = groups.concat(responseJson.data);
                setGroups(newdata);
                setSearchGroups(newdata);
              });
       } catch (error) {
            throw error;
       }
  
    };

    const [searchValue, setSearchValue] = useState('');
    const searchFunction = (text) => {
        const updatedData = groups.filter((item) => {
          const item_data = `${item.name.toUpperCase()})`;
          const text_data = text.toUpperCase();
          return item_data.indexOf(text_data) > -1;
        });
        setSearchValue(text);
        setSearchGroups(updatedData);
      };

    return (
        <>
        <Searchbar
                placeholder="Pretraži grupu..."
                lightTheme
                round
                value={searchValue}
                onChangeText={(text) => searchFunction(text)}
                autoCorrect={false}
                />
        <View style={usersStyles.users}>
            <FlatList
                ListFooterComponent={<View style={{height: 1}}/>}
                data={searchGroups}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                  }
                renderItem={({ item }) => (
                    <TouchableOpacity key={item.id} style={usersStyles.item} onPress={() => navigation.navigate('Group', { id: item.id })}>
                        <Text style={usersStyles.itemText}>{ item.name }</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
        </>
    );
}