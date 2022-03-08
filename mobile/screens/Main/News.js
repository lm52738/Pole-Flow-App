import React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-paper';
import { mainStyles } from '../../styles/global';

export default function News() {
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.card}>
                <Text style={mainStyles.newsTitle}>Obavijest 1</Text>
                <Divider />
                <Text style={mainStyles.newsText}>
                    Light gray is a pale shade of gray with the hex code #D3D3D3, 
                    an achromatic color made by adding just a tiny bit of black 
                </Text>
            </View>
            <View style={mainStyles.card}>
                <Text style={mainStyles.newsTitle}>Obavijest 2</Text>
                <Divider />
                <Text style={mainStyles.newsText}>
                    In a RGB color space, hex #d3d3d3 (also known as Light gray) is 
                    composed of 82.7% red, 82.7% green and 82.7% blue. Whereas in a
                    CMYK color space, it is composed of 0% cyan, 0% magenta, 0% yellow
                </Text>
            </View>
        </View>
    );
}