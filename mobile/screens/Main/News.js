import API from '../../api';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Divider } from 'react-native-paper';
import { mainStyles } from '../../styles/global';

export default function News() {
    const [refreshing, setRefreshing] = useState(true);
    const [news, setNews] = useState([]);

    useEffect(() => getData(), [])

    const getData = async() => {
        try {
            await API.get(`/main/news`).then((response) => {
                console.log(response.data);
                setNews(response.data);
            }).then((responseJson) => {
                setRefreshing(false);
                var newdata = news.concat(responseJson.data);
                setNews(newdata);
              });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={mainStyles.container}>
            {news.map(text => (
                <View key={text.idobavijest} style={mainStyles.card}>
                    <View style={mainStyles.newsInline}>
                        <Text style={mainStyles.newsTitle}>{text.naslov}</Text>
                    </View>
                    <Divider />
                    <Text style={mainStyles.newsText}>
                        {text.tekst}
                    </Text>
                </View>
            ))}
        </View>
    );
}