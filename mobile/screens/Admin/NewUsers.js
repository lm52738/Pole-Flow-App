import React, {useEffect, useState} from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { galleryStyles, mainStyles, usersStyles } from '../../styles/global';
import { Divider } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import API from '../../api';

export default function NewUsers() {

    const [refreshing, setRefreshing] = useState(true);
    const [users, setUsers] = useState([]);
    const [news, setNews] = useState([]);

    useEffect(() => getUsers(), [])
    useEffect(() => getNews(), [])

    const getUsers = async() => {
        await API.get(`/main/newUsers`).then((response) => {
            console.log(response.data);
            setUsers(response.data);
        }).then((responseJson) => {
            setRefreshing(false);
            var newdata = users.concat(responseJson.data);
            setUsers(newdata);
          });
    };

    const getNews = async() => {
        await API.get(`/main/news`).then((response) => {
            console.log(response.data);
            setNews(response.data);
        }).then((responseJson) => {
            setRefreshing(false);
            var newdata = news.concat(responseJson.data);
            setNews(newdata);
          });
    };

    const getData = () => {
        getUsers();
        getNews();
    }

    const navigation = useNavigation();

    return (
        <View style={usersStyles.newUsers}>
            {refreshing ? <ActivityIndicator /> : null}
            <FlatList
            ListFooterComponent={
                <View style={mainStyles.container}>      
                    <TouchableOpacity style={galleryStyles.addButton} onPress={() => navigation.navigate('AddNews')}>
                        <Text style={{color:'#b36cac'}}>NOVA OBAVIJEST</Text>
                    </TouchableOpacity>
                    
                    {news.map(text => (
                        <View key={text.idobavijest} style={mainStyles.card}>
                            <View style={mainStyles.newsInline}>
                                <Text style={mainStyles.newsTitle}>{text.naslov}</Text>
                                <TouchableOpacity style={mainStyles.newsIcon} onPress={() => navigation.navigate('Edit', { id: text.idobavijest })}>
                                    <Feather name="edit-2" size={15} color="black" />
                                </TouchableOpacity>
                            </View>
                            <Divider />
                            <Text style={mainStyles.newsText}>
                                {text.tekst}
                            </Text>
                        </View>
                    ))}
                </View>
            }
            ListHeaderComponent={
                <>
                    { users.length != 0 &&
                        <Text style={usersStyles.newUsersTitle}>NOVI KORISNICI:</Text>
                    }
                    
                </>
            }

            ListEmptyComponent={
                <>
                    <Text style={usersStyles.noUsers}>Nema novih korisnika!</Text>
                </>
            }
                data={users}
                keyExtractor={item => item.idKorisnik}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={getData} />
                  }
                renderItem={({ item }) => (
                    <TouchableOpacity style={usersStyles.newUserItem} onPress={() => navigation.navigate('AdminProfile', { id:item.idkorisnik })}>
                        <Text style={usersStyles.itemText}>{ item.ime } { item.prezime }</Text>
                        <Text style={usersStyles.itemText}>{ item.opcije }</Text>
                        < Divider />
                    </TouchableOpacity>
                    
                )}
                
            />
        </View>
    );
}