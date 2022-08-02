import { useNavigation } from '@react-navigation/native';
import API from '../../api';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Divider } from 'react-native-paper';
import { calendarStyles } from '../../styles/global';
import { getUser } from '../../shared/Utils';

export default function AgendaScreen() {

        const navigation = useNavigation();

        const [refreshing, setRefreshing] = useState(true);
        const [data, setData] = useState([]);
        const [items, setItems] = useState({});

        useEffect(() => getData(), [])
   
        const getData = async() => {
            try {
                await API.get('/calendar').then((response) => {
                    // console.log(response.data);
                    setData(response.data);
                }).then((responseJson) => {
                setRefreshing(false);
                setData(responseJson.data);
                });
                
            } catch (error) {
                throw error;
            }

        };

        const [thisUser,setThisUser] = useState({});

        useEffect(() => fetchAsyncUser(), [])

        const fetchAsyncUser = async() => {
            try {
                const user = await getUser();
                console.log(user.user);
                setThisUser(user.user);
                
            } catch (error) {
                console.log(error);
            }
        };


        const loadItems = (day) => {
            console.log("LOAD ITEMS")
            const newItems = items || {};

            // console.log(data)
            if (data !== undefined && data.length != 0) {
                setTimeout(() => {

                    var date1 = new Date(day.dateString);
                    var date2 = new Date(day.dateString);
                    date1.setDate(date1.getDate() - 7);
                    date2.setDate(date2.getDate() + 7);
                    data.forEach((time) => {
                        // console.log(time.treninzi)

                        var timeDate = new Date(time.datum);
                        if (time.datum == day.dateString || ( timeDate >= date1 && timeDate <= date2)) {
                            
                            if (!newItems[time.datum]) {
                                newItems[time.datum] = new Array();
                            }
                            
                            time.treninzi.forEach((trening) => {
                                newItems[time.datum].push({
                                    idgrupa: trening.idgrupa,
                                    idtrening: trening.idtrening,
                                    name: trening.nazivgrupa,
                                    day: time.datum,
                                    time: trening.vrijemepoc + " - " + trening.vrijemezavr,
                                    level: trening.nazivrazina,
                                    activity: trening.nazivaktivnost,
                                    coach: trening.trener,
                                    arrivals: trening.dolaznost,
                                    callBack: trening.odaziv,

                                });
                                // console.log(newItems[time.datum])
                            })
                        }
                    })
                    
                    
                    // console.log(newItems)
                    setItems(newItems);
                }, 1000);

            }
        };

        const alertPress = (reservation)  => () => {
            var text = '';
            text += reservation.time + "\n"
            text += reservation.activity +  ", " + reservation.level + "\n";
            if (reservation.callBack != null) {
                text += reservation.callBack + "\n";
            }
            text += "Coach: " + reservation.coach

            Alert.alert(reservation.name,text);

        }

        const renderItem = (reservation) => {
            console.log("RENDER ITEM")
            console.log(reservation)
            const fontSize = 18;
            const heightSize = 85;
            const textSize = 16;
            const color = '#43515c';

            const day = new Date(reservation.day);

            if ( thisUser.role != 'Član Kluba' && reservation.arrivals == null && day < new Date()){
                return (
                    <TouchableOpacity
                        style={[calendarStyles.item, {height: heightSize}]}
                        onPress={() => {navigation.navigate('CheckArrivals', {idgrupa : reservation.idgrupa, idtrening: reservation.idtrening, day: reservation.day})}}
                    >
                            <Text style={{fontSize, color}}>{reservation.name}</Text>
                            <Divider style={calendarStyles.divider}/>
                            <Text style={{textSize, color}}>{reservation.time}</Text>
                    </TouchableOpacity>

                  );
            } else {
                return (
                    <TouchableOpacity
                        style={[calendarStyles.item, {height: heightSize}]}
                        onPress={alertPress(reservation)}
                    >
                            <Text style={{fontSize, color}}>{reservation.name}</Text>
                            <Divider style={calendarStyles.divider}/>
                            <Text style={{textSize, color}}>{reservation.time}</Text>
                    </TouchableOpacity>

                  );
            }

            
        };

        const renderEmptyDate = () => {
            return (
            <View style={calendarStyles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
            );
        };

        const rowHasChanged = (r1, r2) => {
            return r1.name !== r2.name;
        };
    
        return (
            <>
                {refreshing ? <ActivityIndicator /> : null}
                <Agenda
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getData} />
                      }
                    items={items}
                    loadItemsForMonth={loadItems}
                    selected={new Date()}
                    renderItem={renderItem}
                    renderEmptyDate={renderEmptyDate}
                    rowHasChanged={rowHasChanged}
                    showClosingKnob={true}
                    firstDay={1}
                />
            </>
            
        )
}