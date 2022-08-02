import React from 'react';
import { mainStyles } from '../../styles/global';
import Media from './Media';
import { View } from 'react-native';

export default function GalleryScreen() {
    return (
        <View style={mainStyles.safeArea}>
            <Media /> 
        </View>
    );
}